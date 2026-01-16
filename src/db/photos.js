/**
 * 照片存储管理
 * 使用 Capacitor Camera 和 Filesystem 插件
 */

// Web环境下使用base64存储
// 原生环境下使用Capacitor插件

/**
 * 拍照或选择图片
 */
export async function takePhoto() {
    // 检查是否在Capacitor环境
    if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera')

        const image = await Camera.getPhoto({
            quality: 80,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Prompt // 让用户选择拍照或相册
        })

        return {
            base64: image.base64String,
            format: image.format,
            webPath: image.webPath
        }
    } else {
        // Web环境：使用文件选择
        return new Promise((resolve, reject) => {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = 'image/*'
            input.capture = 'environment' // 优先使用后置摄像头

            input.onchange = async (e) => {
                const file = e.target.files[0]
                if (!file) {
                    reject(new Error('未选择图片'))
                    return
                }

                const base64 = await fileToBase64(file)
                resolve({
                    base64: base64.split(',')[1], // 移除data:image/xxx;base64,前缀
                    format: file.type.split('/')[1],
                    webPath: URL.createObjectURL(file)
                })
            }

            input.onerror = reject
            input.click()
        })
    }
}

/**
 * 文件转base64
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

/**
 * 保存照片到本地
 */
export async function savePhoto(base64Data, format = 'jpeg') {
    if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        const { Filesystem, Directory } = await import('@capacitor/filesystem')

        const fileName = `photo_${Date.now()}.${format}`

        await Filesystem.writeFile({
            path: `quickbook/${fileName}`,
            data: base64Data,
            directory: Directory.Documents,
            recursive: true
        })

        return {
            fileName,
            path: `quickbook/${fileName}`
        }
    } else {
        // Web环境：直接返回base64，存储在IndexedDB中
        return {
            fileName: `photo_${Date.now()}.${format}`,
            base64: base64Data,
            format
        }
    }
}

/**
 * 读取照片
 */
export async function readPhoto(photoData) {
    if (photoData.base64) {
        return `data:image/${photoData.format || 'jpeg'};base64,${photoData.base64}`
    }

    if (window.Capacitor && window.Capacitor.isNativePlatform() && photoData.path) {
        const { Filesystem, Directory } = await import('@capacitor/filesystem')

        const result = await Filesystem.readFile({
            path: photoData.path,
            directory: Directory.Documents
        })

        return `data:image/${photoData.format || 'jpeg'};base64,${result.data}`
    }

    return null
}

/**
 * 删除照片
 */
export async function removePhoto(photoData) {
    if (window.Capacitor && window.Capacitor.isNativePlatform() && photoData.path) {
        const { Filesystem, Directory } = await import('@capacitor/filesystem')

        await Filesystem.deleteFile({
            path: photoData.path,
            directory: Directory.Documents
        })
    }
    // Web环境下照片存在IndexedDB中，由stores.js处理删除
}

/**
 * 压缩图片
 */
export function compressImage(base64, maxWidth = 1024, quality = 0.8) {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement('canvas')
            let width = img.width
            let height = img.height

            if (width > maxWidth) {
                height = (maxWidth / width) * height
                width = maxWidth
            }

            canvas.width = width
            canvas.height = height

            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)

            const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
            resolve(compressedBase64.split(',')[1])
        }
        img.src = `data:image/jpeg;base64,${base64}`
    })
}

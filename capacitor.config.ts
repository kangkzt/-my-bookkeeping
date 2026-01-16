import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.quickbook.app',
    appName: '快速记账',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    },
    plugins: {
        Camera: {
            presentationStyle: 'fullScreen'
        },
        Filesystem: {
            directory: 'Documents'
        }
    }
};

export default config;

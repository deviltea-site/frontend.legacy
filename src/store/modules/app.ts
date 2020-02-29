import store from '@/store'
import { Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators'

export enum DeviceType {
  Mobile,
  Tablet,
  Desktop
}

@Module({ dynamic: true, store, name: 'app' })
class AppModule extends VuexModule {
  deviceType = DeviceType.Desktop

  get isMobile () {
    return this.deviceType === DeviceType.Mobile
  }

  get isTablet () {
    return this.deviceType === DeviceType.Tablet
  }

  get isDesktop () {
    return this.deviceType === DeviceType.Desktop
  }

  @Mutation
  setDeviceType (deviceType: DeviceType) {
    this.deviceType = deviceType
  }
}

const appModule = getModule(AppModule)

export default appModule

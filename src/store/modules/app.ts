import store from '@/store'
import { Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators'

export enum DeviceType {
  Mobile,
  Tablet,
  Desktop
}

export enum EnvironmentType {
  Development,
  Production
}

@Module({ dynamic: true, store, name: 'app' })
class AppModule extends VuexModule {
  device = DeviceType.Desktop
  environment = EnvironmentType.Production

  get isMobile () {
    return this.device === DeviceType.Mobile
  }

  get isTablet () {
    return this.device === DeviceType.Tablet
  }

  get isDesktop () {
    return this.device === DeviceType.Desktop
  }

  get isDevelopment () {
    return this.environment === EnvironmentType.Development
  }

  get isProduction () {
    return this.environment === EnvironmentType.Production
  }

  @Mutation
  setDevice (device: DeviceType) {
    this.device = device
  }

  @Mutation
  setEnvironment (environment: EnvironmentType) {
    this.environment = environment
  }
}

const appModule = getModule(AppModule)

export default appModule

import * as k8s from '@pulumi/kubernetes'
import { ApiConfig } from './api'

export * from './config'
export * from './api'
export * from './docker'
export * from './statefulService'
export * from './hasher'

export interface Dockerhub {
  username: string
  password: string
  server: string
}

export interface BaseConfig {
  /**
   * This is used to create dockerhub repositories and push/pull images
   */
  dockerhub?: Dockerhub
  additionalEnvironments?: string[]
  /**
   * Creates ingress for public dns
   *
   * _this assumes ExternalDNS and Traefik have been configured on the cluster_
   */
  rootDomainName?: string
}

export interface BackupConfig {
  count: number
  schedule: string
}

export interface StatefulService {
  replicas: number
  coinServices: Array<CoinServiceConfig>
  backup?: BackupConfig
}

export interface CoinStackConfig extends BaseConfig {
  stack: string
  name: string
  network: string
  environment?: string
  api?: ApiConfig
  statefulService?: StatefulService
}

export interface CoinServiceConfig {
  cpuLimit?: string
  cpuRequest?: string
  image: string
  memoryLimit?: string
  memoryRequest?: string
  name: string
  storageSize: string
}

export interface CoinService {
  serviceName: string,
  ports: Array<
    k8s.types.input.core.v1.ServicePort & { ingressRoute?: boolean; pathPrefix?: string; stripPathPrefix?: boolean }
  >
  configMapData: Record<string, string>
  containers: Array<k8s.types.input.core.v1.Container>
  volumeClaimTemplates: Array<k8s.types.input.core.v1.PersistentVolumeClaim>
}

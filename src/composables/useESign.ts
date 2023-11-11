import type { ESignKey } from '@shohrux_saidov/eimzo-client'
import { initModuleEimzo } from '@shohrux_saidov/eimzo-client'
import type { ESignAlias } from '~/types'

export const useESign = () => {
  const esign = ref()
  const keys = ref<ESignKey[]>()

  const init = async () => {
    esign.value = await initModuleEimzo()
    await esign.value.checkVersion()
    await esign.value.installApiKeys()
  }

  const getKeys = (): Promise<ESignKey[]> => {
    return esign.value.listAllUserKeys()
  }

  const loadKeys = async () => {
    keys.value = await getKeys()
  }

  const isKeyOfOrg = (esign: ESignKey) => {
    return !!esign.O
  }

  const getAliasOfKey = (key: ESignKey) => {
    const alias = key.alias.split(',')
    const hashAlias: Record<keyof ESignAlias, string> = {
      '1.2.860.3.16.1.1': '',
      'cn': '',
      'o': '',
      'st': '',
      'uid': '',
    }
    alias.forEach((item: string) => {
      const [key, value] = item.split('=') as [keyof ESignAlias, string]
      hashAlias[key] = value
    })

    return hashAlias
  }

  return {
    esign,
    keys,
    isKeyOfOrg,
    init,
    getKeys,
    getAliasOfKey,
    loadKeys,
  }
}

import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

export default function useSocket(url: string, options: any = {}) {
  const socket = ref<Socket>()
  const hasConnected = ref(false)

  const connect = () => {
    socket.value = io(url, options)
    return new Promise((resolve) => {
      resolve(socket)
    })
  }

  return {
    socket,
    hasConnected,
    connect,
  }
}

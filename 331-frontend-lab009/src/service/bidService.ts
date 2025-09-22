// src/services/bidService.ts (optional if you need bid CRUD)
import axios from 'axios'
import type { Bid } from '@/types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
})

export const bidService = {
  createBid(itemId: number, amount: number) {
    return apiClient.post<Bid>(`/bids`, { amount, itemId }).then(r => r.data)
  },
  getBidsForItem(itemId: number) {
    return apiClient.get<Bid[]>(`/bids?itemId=${itemId}`).then(r => r.data)
  }
}

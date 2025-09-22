// src/services/auctionItemService.ts
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { AuctionItemSummary, AuctionItemDetail } from '@/types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export interface PagedResult<T> {
  data: T[]
  total: number
  page: number
  perPage: number
}

function extractPaged<T>(res: AxiosResponse<T[]> , page: number, perPage: number): PagedResult<T> {
  const totalHeader = res.headers['x-total-count']
  const total = totalHeader ? parseInt(totalHeader, 10) : res.data.length
  return { data: res.data, total, page, perPage }
}

export const auctionItemService = {
  getAuctionItems(perPage: number, page: number) {
    return apiClient
      .get<AuctionItemSummary[]>(`/auction-items?_limit=${perPage}&_page=${page}`)
      .then(r => extractPaged(r, page, perPage))
  },

  getAuctionItemsByDescription(description: string, perPage: number, page: number) {
    return apiClient
      .get<AuctionItemSummary[]>(`/auction-items?description=${encodeURIComponent(description)}&_limit=${perPage}&_page=${page}`)
      .then(r => extractPaged(r, page, perPage))
  },

  getAuctionItemsUnderMaxBid(maxBid: number, perPage: number, page: number) {
    return apiClient
      .get<AuctionItemSummary[]>(`/auction-items/under?maxBid=${maxBid}&_limit=${perPage}&_page=${page}`)
      .then(r => extractPaged(r, page, perPage))
  },

  getAuctionItem(id: number) {
    return apiClient.get<AuctionItemDetail>(`/auction-items/${id}`).then(r => r.data)
  },

  createAuctionItem(payload: Omit<AuctionItemDetail, 'id' | 'bids' | 'successfulBid'>) {
    return apiClient.post(`/auction-items`, payload).then(r => r.data)
  },

  getAuctionItemsByKeyword(
    keyword: string,
    perPage: number,
    page: number,
  ) {
    const url = `/auction-items?q=${encodeURIComponent(keyword)}&_limit=${perPage}&_page=${page}`
    console.log('API URL:', url)
    return apiClient.get<AuctionItemSummary[]>(url)
      .then(r => extractPaged(r, page, perPage))
  },
}

export default auctionItemService

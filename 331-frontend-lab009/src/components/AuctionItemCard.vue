<!-- src/components/AuctionItemCard.vue -->
<script setup lang="ts">
import { type AuctionItemSummary } from '@/types'

defineProps<{
  auctionItem: AuctionItemSummary
}>()
</script>

<template>
  
    <div
      class="cursor-pointer border border-gray-300 rounded-lg p-5 w-64 mb-4 hover:scale-105 hover:shadow-lg transition-all duration-300 bg-white"
    >
      <h2 class="text-xl font-bold mb-2 text-gray-800">{{ auctionItem.description }}</h2>
      <div class="text-sm text-gray-600 mb-3">
        <span class="bg-blue-100 px-2 py-1 rounded-full text-red-800">{{ auctionItem.type }}</span>
      </div>
    </div>
  
</template>

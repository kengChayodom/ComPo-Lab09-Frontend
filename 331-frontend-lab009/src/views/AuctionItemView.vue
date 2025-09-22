<!-- src/views/AuctionItemView.vue -->
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import AuctionItemCard from '@/components/AuctionItemCard.vue'
import { auctionItemService } from '@/service/AuctionItemService'
import type { AuctionItemSummary } from '@/types'

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
})

const page = computed(() => props.page)
const pageSize = computed(() => props.pageSize)

const auctionItems = ref<AuctionItemSummary[]>([])
const totalAuctionItems = ref(0)
const keyword = ref('')

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalAuctionItems.value / pageSize.value)
  return page.value < totalPages
})

const pageSizeOption = [2, 3, 4, 5]
const router = useRouter()

function updatePageSize(event: Event) {
  const target = event.target as HTMLSelectElement
  const newPageSize = Number(target.value)
  router.push({ name: 'home', query: { page: '1', pageSize: String(newPageSize) } })
}

function loadAuctionItems() {
  auctionItemService.getAuctionItems(pageSize.value, page.value)
    .then((result) => {
      console.log('Loading auction items:', result.data)
      auctionItems.value = result.data
      totalAuctionItems.value = result.total
    })
    .catch((error: Error) => {
      console.error('There was an error loading auction items!', error)
    })
}

function updateKeyword(value: string) {
  keyword.value = value // Make sure to update the ref
  let queryFunction

  if (value.trim() === '') {
    // Load all auction items when search is empty
    queryFunction = auctionItemService.getAuctionItems(pageSize.value, page.value)
  } else {
    // Search with keyword
    queryFunction = auctionItemService.getAuctionItemsByKeyword(value, pageSize.value, page.value)
  }

  queryFunction
    .then((response) => {
      console.log('Search results:', response.data)
      auctionItems.value = response.data
      totalAuctionItems.value = response.total
    })
    .catch((error) => {
      console.log('Search error:', error)
      router.push({ name: 'NetworkError' })
    })
}

// Watch for page/pageSize changes (when not searching)
watch([page, pageSize], () => {
  if (keyword.value.trim() === '') {
    loadAuctionItems()
  } else {
    // If we have a keyword, search again with new pagination
    updateKeyword(keyword.value)
  }
})

onMounted(() => {
  loadAuctionItems()
})
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Auction Items</h1>

    <!-- Search and Filter Section -->
    <div class="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="flex-1 max-w-md">
        <input
          v-model="keyword"
          type="text"
          placeholder="Search auction items..."
          @input="(e) => updateKeyword((e.target as HTMLInputElement).value)"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

      </div>

      <!-- Page Size Selector -->
      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-600">Items per page:</label>
        <select
          :value="pageSize"
          @change="updatePageSize($event)"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="size in pageSizeOption" :key="size" :value="size">{{ size }}</option>
        </select>
      </div>
    </div>

    <!-- Auction Items Grid -->
    <div v-if="auctionItems && auctionItems.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AuctionItemCard v-for="item in auctionItems" :key="item.id" :auction-item="item" />
    </div>

    <!-- Empty State -->
    <div v-else-if="auctionItems?.length === 0" class="text-center py-12">
      <div class="text-gray-400 text-6xl mb-4">📦</div>
      <h3 class="text-xl text-gray-600 mb-2">No auction items found</h3>
      <p class="text-gray-500">Try adjusting your search or check back later.</p>
    </div>

    <!-- Loading State -->
    <div v-else class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading auction items...</p>
    </div>

    <!-- Pagination
    <div v-if="auctionItems && auctionItems.length > 0" class="mt-8 flex justify-center items-center gap-4">
      <router-link
        v-if="page > 1"
        :to="{ name: 'auction-list-view', query: { page: String(page - 1), pageSize: String(pageSize) } }"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Previous
      </router-link>


      <router-link
        v-if="hasNextPage"
        :to="{ name: 'auction-list-view', query: { page: String(page + 1), pageSize: String(pageSize) } }"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Next
      </router-link>
    </div> -->
  </div>
</template>

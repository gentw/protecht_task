<<template>

    <div>
  
  
      <!-- <products-list-add-new
        :is-add-new-user-sidebar-active.sync="isAddNewProductSidebarActive"
        @refetch-data="refetchData"
      /> -->
  
    
      <!-- Table Container Card -->
      <b-card
        no-body
        class="mb-0"
      >
  
        <div class="m-2">
  
          <!-- Table Top -->
          <b-row>
  
            <!-- Per Page -->
            <b-col
              cols="12"
              md="6"
              class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
            >
              <label>Show</label>
              <v-select
                v-model="perPage"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="perPageOptions"
                :clearable="false"
                class="per-page-selector d-inline-block mx-50"
              />
              <label>entries</label>
            </b-col>
  
            <!-- Search -->
            <b-col
              cols="12"
              md="6"
            >
              <div class="d-flex align-items-center justify-content-end">
                <b-form-input
                  v-model="searchQuery"
                  class="d-inline-block mr-1"
                  placeholder="Search..."
                />
                <b-button
                  variant="primary"
                  @click="isAddNewProductSidebarActive = true"
                >
                  <span class="text-nowrap">Shto produkt</span>
                </b-button>
              </div>
            </b-col>
          </b-row>
  
        </div>
  
        <b-table
          ref="refProductListTable"
          class="position-relative"
          :items="fetchProducts"
          responsive
          :fields="tableColumns"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          empty-text="No matching records found"
          :sort-desc.sync="isSortDirDesc"
        >
  
          <!-- Column: User -->
          <template #cell(transaction)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="'default'"
                :text="avatarText(data.item.name)"
                :variant="`light-primary`"
                :to="{ name: 'apps-transactions-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'apps-transactions-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.name }}
            </b-link>
            <small class="text-muted">@{{ data.item.name }}</small>
          </b-media>
          
        </template>

        <template #cell(transaction)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="'default'"
                :text="avatarText(data.item.name)"
                :variant="`light-primary`"
                :to="{ name: 'apps-transactions-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'apps-transactions-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.price }}
            </b-link>
            <small class="text-muted">@{{ data.item.name }}</small>
          </b-media>
        </template>

     
  
      
  
        
          <!-- Column: Actions -->
          <template #cell(actions)="data" style="position: fixed!important;
    z-index: 9999!important;
  ">
            <b-dropdown
              variant="link"
              no-caret
              :right="$store.state.appConfig.isRTL"
            >
  
              <template #button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="align-middle text-body"
                />
              </template>
              <!-- <b-dropdown-item :to="{ name: 'apps-users-view', params: { id: data.item.id } }">
                <feather-icon icon="FileTextIcon" />
                <span class="align-middle ml-50">Detajet</span>
              </b-dropdown-item>
  
              <b-dropdown-item :to="{ name: 'apps-users-edit', params: { id: data.item.id } }">
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">Ndrysho</span>
              </b-dropdown-item> -->
  
              <!-- <b-dropdown-item @click="deleteProduct(data.item.id)">
                <feather-icon icon="TrashIcon" />
                <span class="align-middle ml-50">Fshije</span>
              </b-dropdown-item> -->
            </b-dropdown>
          </template>
  
        </b-table>
        <div class="mx-2 mb-2">
          <b-row>
  
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
            >
              <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
            </b-col>
            <!-- Pagination -->
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
            >
  
              <b-pagination
                v-model="currentPage"
                :total-rows="totalProducts"
                :per-page="perPage"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
              >
                <template #prev-text>
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template #next-text>
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
  
            </b-col>
  
          </b-row>
        </div>
      </b-card>
    </div>
  </template>
  
  <script>
  import {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
  } from 'bootstrap-vue'
  import vSelect from 'vue-select'
  import store from '@/store'
  import { ref, onUnmounted, onMounted, computed } from '@vue/composition-api'
  import { avatarText } from '@core/utils/filter'
  import useProductsList from './useProductsList'
  import productStoreModule from './productStoreModule'
  import ProductsListAddNew from './ProductsListAddNew.vue'
  
  export default {
    components: {
      ProductsListAddNew,
  
      BCard,
      BRow,
      BCol,
      BFormInput,
      BButton,
      BTable,
      BMedia,
      BAvatar,
      BLink,
      BBadge,
      BDropdown,
      BDropdownItem,
      BPagination,
  
      vSelect,
    },
    setup() {
      const PRODUCT_APP_STORE_MODULE_NAME = 'app-product'
  
      // Register module
      if (!store.hasModule(PRODUCT_APP_STORE_MODULE_NAME)) store.registerModule(PRODUCT_APP_STORE_MODULE_NAME, productStoreModule)
  
      // UnRegister on leave
      onUnmounted(() => { 
        if (store.hasModule(PRODUCT_APP_STORE_MODULE_NAME)) store.unregisterModule(PRODUCT_APP_STORE_MODULE_NAME)          
      })
  
      onMounted(() => {
        setTimeout(()=> {
            
        },1000);
      });
      
  
      const isAddNewProductSidebarActive = ref(false)
  
     
      const {
        fetchProducts,
        tableColumns,
        perPage,
        currentPage,
        totalProducts,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refProductListTable,
        refetchData,
  
        // UI
      
  
        // Extra Filters
      
        deleteProduct
        
      } = useProductsList()
  
      return {
        // Sidebar
        isAddNewProductSidebarActive,
  
        fetchProducts,
      
        tableColumns,
        perPage,
        currentPage,
        totalProducts,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refProductListTable,
        refetchData,
  
        // Filter
        avatarText,
        deleteProduct
      }
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .per-page-selector {
    width: 90px;
  }
  </style>
  
  <style lang="scss">
  @import '~@resources/scss/vue/libs/vue-select.scss';
  </style>
  >
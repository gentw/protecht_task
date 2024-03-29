import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useProductsList() {
  // Use toast
  const toast = useToast()

  const refProductListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'name', label: 'Name'},
    { key: 'price', label: 'Price' },
    { key: 'actions', label: 'Actions' },
  ]
  const perPage = ref(10)
  const totalProducts = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const productDatas = ref({});

  const dataMeta = computed(() => {
    const localItemsCount = refProductListTable.value ? refProductListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalProducts.value,
    }
  })

  const refetchData = () => {
    refProductListTable.value.refresh()
  }

  watch([currentPage, perPage], () => {
    refetchData()
  })

  const fetchProducts = (ctx, callback) => {
    store
      .dispatch('app-product/fetchProducts', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
      })
      .then(response => {
        const { products, total } = response.data

        callback(products)
        totalProducts.value = total

        console.log(response.data);
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching products list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  const fetchProduct = (id) => {
    store.dispatch('app-product/viewProduct', id).then((response) => {
      productDatas.value = response.data;
    });
  }


  const deleteProduct = (id) => {
    store.dispatch('app-product/deleteProduct', id).then(() => {
      refetchData() 
    }).then(response => {
      toast({
        component: ToastificationContent,
        props: {
          title: 'Produkti u fshi me sukses!',
          icon: 'AlertTriangleIcon',
          variant: 'success',
        },
      })
    })
    .catch(() => {
      toast({
        component: ToastificationContent,
        props: {
          title: 'Fshirja deshtoi!!',
          icon: 'AlertTriangleIcon',
          variant: 'danger',
        },
      })
    })
  }

 

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

 

  return {
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
    productDatas,
    fetchProduct,

    // Extra Filters
    
    deleteProduct
  }
}
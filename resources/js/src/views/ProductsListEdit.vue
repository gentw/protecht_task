<template>
 
    <b-sidebar
      id="add-new-product-sidebar"
      :visible="isProductsListEditSidebarActive"
      bg-variant="white"
      sidebar-class="sidebar-lg"
      shadow
      backdrop
      no-header
      right
      @hidden="resetForm"
      @change="(val) => $emit('update:is-products-list-edit-sidebar-active', val)"
    >
      <template #default="{ hide }">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
          <h5 class="mb-0">
           Ndrysho
          </h5>
  
          <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
          />
  
        </div>
  
        <!-- BODY -->
        <validation-observer
          #default="{ handleSubmit }"
          ref="refFormObserver"
        >
          <!-- Form -->
          <b-form
            class="p-2"
            @submit.prevent="handleSubmit(onSubmit)"
            @reset.prevent="resetForm"
          >
  
            <validation-provider
              #default="validationContext"
              name="Emri"
              rules="required"
            >
              <b-form-group
                label="Emri"
                label-for="name"
              >
                <b-form-input
                  id="name"
                  v-model="productData.name"
                  autofocus
                  :state="getValidationState(validationContext)"
                  trim
                  placeholder="Emri"
                />
  
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
  
            <validation-provider
              #default="validationContext"
              name="Cmimi"
              rules="required|doublerequired"
            >
              <b-form-group
                label="Cmimi"
                label-for="name"
              >
                <b-form-input
                  id="name"
                  v-model="productData.price"
                  autofocus
                  :state="getValidationState(validationContext)"
                  trim
                  placeholder="Cmimi"
                />
  
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
  
  
          
  
            <!-- Form Actions -->
            <div class="d-flex mt-2">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mr-2"
                type="submit"
              >
                Ndrysho
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="button"
                variant="outline-secondary"
                @click="hide"
              >
                Hiqe
              </b-button>
            </div>
  
          </b-form>
        </validation-observer>
      </template>
    </b-sidebar>
  </template>
  
  <script>
  import { BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton } from 'bootstrap-vue'
  import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
  import { ref } from '@vue/composition-api'
  import { required, alphaNum, email } from '@validations'
  import formValidation from '@core/comp-functions/forms/form-validation'
  import Ripple from 'vue-ripple-directive'
  import vSelect from 'vue-select'
  import store from '@/store'
  import { useToast } from 'vue-toastification/composition'
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
  
  
  export default {
    components: {
      BSidebar,
      BForm,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BButton,
      vSelect,
  
      // Form Validation
      ValidationProvider,
      ValidationObserver,
    },
    directives: {
      Ripple,
    },
    model: {
      prop: 'isProductsListEditSidebarActive',
      event: 'update:is-products-list-edit-sidebar-active',
    },
    props: {
      isProductsListEditSidebarActive: {
        type: Boolean,
        required: true,
      },
  
      productData: {
        type: Object,
        required: true
      }
      
    },
    data() {
      return {
        required,
        alphaNum,
        email,
      }
    },
    setup(props, { emit }) {
      const blankProductData = {
        name: '',
        price: '',
       
      }
  
      const productDatas = ref(JSON.parse(JSON.stringify(props.productData)));
  
      extend('doublerequired', {
        validate: (value) => {
          const regex = /^\d+(\.\d{1,2})?$/;
          return regex.test(value);
        },
        message: 'Cmimi i shkruar nuk lejohet (shembujt e lejuar: 50 ose 50.25)!',
        
      });
      const toast = useToast()
     
      const resetProductData = () => {
        props.productData = JSON.parse(JSON.stringify(blankProductData))
      }
  
      const onSubmit = () => {
        store.dispatch('app-product/updateProduct', props.productData).then((response) => {
          if(response.data == 'success') {
            emit('refetch-data')
            emit('update:is-products-list-edit-sidebar-active', false)
          } else {
            toast({
              component: ToastificationContent,
              props: {
                title: response.data,
                icon: 'AlertTriangleIcon',
                variant: 'danger',
              },
            })
          }        
        })
      }
  
      const { refFormObserver, getValidationState, resetForm } = formValidation(resetProductData)
  
      return {
        productDatas,
        onSubmit,
  
        refFormObserver,
        getValidationState,
        resetForm,
      }
    },
  }
  </script>
  
  <style lang="scss">
  @import '~@resources/scss/vue/libs/vue-select.scss';
  
  #add-new-product-sidebar {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
  
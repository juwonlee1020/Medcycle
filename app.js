new Vue({
    el: '#app',
    data: {
        isShowingCart: false,

        cart: {
            items: []
        },

        products: [
            {
                id: 1,
                name: 'Fresenius Advanced Hemodialysis Machine 4008',
                type: 'Haemodialysis Machine',
                brand: 'Fresenius',
                original: 40000,
                price: 20000,
                inStock: 2,
                img: 'img/dialysis.png'
            },
            {
                id: 2,
                name: 'DBB-EXA',
                type: "Haemodialysis Machine",
                brand: 'Nikkiso',
                original: 40000,
                price: 20000,
                inStock: 3,
                img: 'img/haemo_two.jpg'
            },
            {
                id: 3,
                name: 'TM-1009',
                type: 'Ultrasound scanner',
                brand: 'Technocare Medisystem',
                original: 15000,
                price: 8000,
                inStock: 5,
                img: 'img/ultrasound.jpg'
            },
            {
                id: 4,
                name: 'ODM-2200 Ultrasonic A/B Scanner',
                type: 'Ultrasound scanner',
                brand: 'MEDA Co., Ltd',
                original: 145000,
                price: 7800,
                inStock: 3,
                img: 'img/ultrasound_two.jpg'
            },
            {
                id: 5,
                name: ' Meditec VISTA Ventilator',
                type: 'Medical Ventilator',
                brand: 'Meditec England',
                original: 40000,
                price: 21000,
                inStock: 1,
                img: 'img/ventilator.png'
            },
            {
                id: 6,
                name: "Neonatal Intensive Care Incubator Inc 200",
                brand: "Phoenix",
                type: 'Infant Incubator',
                original: 20000,
                price: 12000,
                inStock: 1,
                img: "img/neonatal.png"
            }
        ]
    },

    filters: {
        currency: function(value) {
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'RMB',
                minimumFractionDigits: 0
            });

            return formatter.format(value);
        }
    },

    methods: {
        addProductToCart: function(product) {
            var cartItem = this.getCartItem(product);

            if (cartItem != null) {
                cartItem.quantity++;
            } else {
                this.cart.items.push({
                    product: product,
                    quantity: 1
                });
            }

            product.inStock--;
        },

        increaseQuantity: function(cartItem) {
            cartItem.product.inStock--;
            cartItem.quantity++;
        },

        decreaseQuantity: function(cartItem) {
            cartItem.quantity--;
            cartItem.product.inStock++;

            if (cartItem.quantity == 0) {
                this.removeItemFromCart(cartItem);
            }
        },

        removeItemFromCart: function(cartItem) {
            var index = this.cart.items.indexOf(cartItem);

            if (index !== -1) {
                this.cart.items.splice(index, 1);
            }
        },

        checkout: function() {
            if (confirm('Are you sure that you want to purchase these products?')) {
                this.cart.items.forEach(function(item) {
                    item.product.inStock += item.quantity;
                });

                this.cart.items = [];
            }
        },

        getCartItem: function(product) {
            for (var i = 0; i < this.cart.items.length; i++) {
                if (this.cart.items[i].product.id === product.id) {
                    return this.cart.items[i];
                }
            }

            return null;
        }
    },

    computed: {
        cartTotal: function() {
            var total = 0;

            this.cart.items.forEach(function(item) {
                total += item.quantity * item.product.price;
            });

            return total;
        },

        taxAmount: function() {
            return ((this.cartTotal * 10) / 100);
        }
    }
});
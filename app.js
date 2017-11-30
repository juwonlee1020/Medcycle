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
                img: 'img/dialysis.jpg'
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
                description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
                price: 49,
                inStock: 42
            },
            {
                id: 5,
                name: 'iPad Pro (9.7 inch)',
                description: 'We heard it\'s supposed to be pretty good. At least that\'s what people say.',
                price: 599,
                inStock: 0
            },
            {
                id: 6,
                name: 'OnePlus 3 cover',
                description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
                price: 19,
                inStock: 81
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
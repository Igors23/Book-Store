var app = new Vue({
	el: "#app",
	data: {
		///	return {
		page: 'home',
		url: "https://api.jsonbin.io/b/5c8a42a6bb08b22a756b2920",
		books: [],
		currentBook: {},
		selectedBook: [],
		freeBooks: [],
		currentSlide: 0,
		search: '',
		total: 0,
		discountedPrice: 0,
		totalItems: 0,
		selectedCategory: "All"
		///	value: [5, 10, 15, 20, 25, 30, 35, 40]
		///originalPrice: 0

		///	}
	},

	watch: {
		//////Discount
		total: function () {
			if (this.selectedBook.length > 4) {
				var i = this.total * 0.1;
				this.discountedPrice = this.total - i;

			} else if (this.selectedBook.length < 5) {
				this.discountedPrice = 0;
			}
		}
	},

	methods: {



		addToCart(book) {

			this.selectedBook.push(book);

			this.totalItems += 1;
			///	this.originalPrice += Number(book.price);

		},
		/////Free Books
		getFreeBooks: function () {
			this.freeBooks = [];
			var uniqueBooks = [...new Set(this.selectedBook.map(book => book.title))];
			console.log(uniqueBooks);
			for (var s = 0; s < this.selectedBook.length; s++) {
				this.total += Number(this.selectedBook[s].price);

			}

			for (var i = 0; i < uniqueBooks.length; i++) {
				var counter = 0;

				for (var r = 0; r < this.selectedBook.length; r++) {


					if (this.selectedBook[r].title == uniqueBooks[i]) {



						counter += 1;
						console.log("counter", counter)
						if (counter == 4) {

							console.log("FREE")
							counter = 0;
							this.freeBooks.push(this.selectedBook[r]);

							//console.log("free book price -" + this.selectedBook[r].price + "total - " + this.total);
							///var test = this.total - this.selectedBook[r].price;
							//console.log("tot"+ this.total);
							//console.log("tot after free book ->" + test);

							console.log(this.total);
							this.total -= Number(this.selectedBook[r].price);
							console.log(this.total);

						}
					}
				}
			}



		},






		/////// Remove Element ////
		removeElement(book) {
			this.selectedBook.splice(this.selectedBook.indexOf(book), 1);
			this.total -= Number(book.price);
			this.totalItems -= 1;
			///	this.originalPrice -= Number(book.price);

		},




		///////////// Slider /////////
		slider: function () {
			var slides = document.querySelectorAll('#slides .slide');
			slides[this.currentSlide].className = 'slide';
			this.currentSlide = (this.currentSlide + 1) % slides.length;
			slides[this.currentSlide].className = 'slide showing';
		},

		nextSlide: function () {
			var slideInterval = setInterval(app.slider, 2000);
		},

		menu: function () {
			var menuElem = document.getElementById('mainMenu');
			var titleElem = menuElem.querySelector('.title');
			menuElem.classList.toggle('open');
		},

		bookSelect(string, book) {
			this.page = string;
			this.currentBook = book;

		}
	},
	created() {
		{
			fetch(this.url)
				.then(function (data) {
					return data.json()
				})
				.then(function (json) {
					app.books = json.books
					app.nextSlide();
				})
		}
	},

	///// Book Filter
	computed: {
		filteredArray() {
			return this.books.filter((read) => {
				return read.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
			});

			
			var uniqueCategories = [...new Set(this.book.map(book => book.category).sort())];

			var category = this.selectedCategory;

			if (category === "All") {
				return this.books;
			} else {
				return this.books.filter(function (book) {
					return book.category === category;
				});
			}


		}




	},
});

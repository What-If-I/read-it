<template>
  <div class="books container grid-xl">

    <div v-if="isLoading" class="loading loading-lg"></div>

    <div v-else-if="books !== null && books.length" class="columns">
      <BookCover class="column col-2 col-mg-4 col-md-4 col-sm-4 col-xs-6"
      v-for="book in books"
      :key="book.id"
      :book="book">
      </BookCover>
    </div>

    <div v-else class="empty">
      <div class="empty-icon">
        <i class="icon icon-search"></i>
      </div>
      <p class="empty-title h5">Список книг пуст</p>
      <p class="empty-subtitle">Загрузи свою первую книгу!</p>
      <div class="empty-action">
        <router-link class="btn btn-primary" to='/upload-book' tag="button">Добавить книгу</router-link>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BookCover from '@/components/BookCover.vue';
import bookData from '@/data/books';
import { Book as BookType } from '@/types';

@Component({
  components: {
    BookCover,
  },
})
export default class BooksVue extends Vue {
  public get books() {
    return this.$store.state.books;
  }
  private isLoading = false;

  private created() {
    if (this.books === null) {
      this.isLoading = true;
      this.$http
        .get('/books')
        .then((resp) => {
          const books = resp.data.map(
            (el: any): BookType => {
              return {
                id: el.id,
                title: el.title,
                author: el.author,
                pages: [],
                coverURL: el.cover,
              };
            },
          );
          this.$store.commit('saveBooks', books);
        })
        .catch((err) => {
          console.log(err.response ? err.response : err);
          this.$snotify.error(
            'Не удалось загрузить книги. Попробуйте обновить страницу.',
          );
        })
        .finally(() => (this.isLoading = false));
    }
  }
}
</script>
<style scoped>
.empty {
  background: none;
}
</style>

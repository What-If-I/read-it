<template>
    <div class="book-cover card">
      <loader-modal ref="loader"></loader-modal>

      <modal v-if="showDeleteModal" @is-confirmed="onDeleteConfirm">
        <template slot="title">Удалить книгу</template>
        <template slot="content"><p>Вы действительно хотите удалить книгу?</p></template>
        <template slot="confirmation">Да</template>
      </modal>

      <modal v-if="showEditModal" @is-confirmed="onEditConfirm">
        <template slot="title">Редактировать книгу</template>
        <template slot="content"><book-edit-form :book="this.book" ref="bookEditForm"></book-edit-form></template>
        <template slot="confirmation">Да</template>
      </modal>


        <router-link :to="{name: 'book', params: { bookID: book.id }}">
        <div class="card-image">
            <img v-if="book.coverURL" :src="book.coverURL" :alt="book.title" class="img-responsive">
            <template v-else>
              <img src="@/assets/book-cover.jpg" :alt="book.title" class="img-responsive">
              <div class="img-text">
                <p class="title">{{ book.title}}</p>
                <p class="author">{{ book.author}}</p>
              </div>
            </template>
        </div>
        <div class="card-header">
            <div class="card-title h6">{{ book.title }}</div>
            <div class="card-subtitle text-gray">{{ book.author }}</div>
        </div>
        </router-link>
        <div class="dropdown book-actions">
          <a class="btn btn-link btn-md dropdown-toggle" tabindex="0">
            <i class="icon icon-more-vert"></i>
            </a>
              <ul class="menu">
                <li class="menu-item text-primary"><a href="#" @click.prevent="showEditModal=true"><i class="icon icon-edit"></i> Редактировать</a></li>
                <li class="menu-item"><a href="#" @click.prevent="showDeleteModal=true"><i class="icon icon-delete"></i> Удалить</a></li>
              </ul>
        </div>
    </div>   
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Book as BookType } from '@/types.ts';
import Modal from '@/components/Modal.vue';
import LoaderModal from '@/components/LoaderModal.vue';
import BookEditForm from '@/components/BookEditForm.vue';

@Component({
  components: {
    Modal,
    BookEditForm,
    LoaderModal,
  },
})
export default class Book extends Vue {
  @Prop({ required: true })
  public book!: BookType;

  public showDeleteModal = false;
  public showEditModal = false;

  private loader!: LoaderModal;

  public editBook() {
    const formBookData = (this.$refs.bookEditForm as BookEditForm).data;
    const newBookData = {
      title: formBookData.title,
      author: formBookData.author,
      cover: formBookData.coverURL,
    };
    this.loader.show();
    this.$http
      .patch(`/books/${this.book.id}`, newBookData)
      .then((resp) => {
        this.$store.commit('updateBook', { ...this.book, ...newBookData });
      })
      .catch((err) => {
        console.error(err);
        this.$snotify.error(
          'Не удалось обновить информацию о книге. Сервер временно недоступен.',
        );
      })
      .finally(() => this.loader.hide());
  }

  public deleteBook() {
    this.loader.show();
    this.$http
      .delete(`/books/${this.book.id}`)
      .then((resp) => this.$store.commit('deleteBook', this.book))
      .catch((err) => {
        console.error(err);
        this.$snotify.error('Не удалось удалить книгу. Сервер временно недоступен.');
      })
      .finally(() => this.loader.hide());
  }

  private onEditConfirm(isConfirmed: boolean) {
    this.showEditModal = false;
    if (isConfirmed) {
      this.editBook();
    }
  }

  private onDeleteConfirm(isConfirmed: boolean) {
    this.showDeleteModal = false;
    if (isConfirmed) {
      this.deleteBook();
    }
  }

  private mounted() {
    this.loader = this.$refs.loader as LoaderModal;
  }
}
</script>

<style scoped>
.book-cover {
  position: relative;
}
.book-actions {
  position: absolute;
  align-self: flex-end;
  opacity: 0.85;
  padding: 0;
  bottom: 10px;
}
.book-actions:hover {
  opacity: 1;
}
a {
  color: #807fe2;
  height: 100%;
}

.card-image {
  height: 70%;
  position: relative;
}
.card-image:first-child {
  padding-top: 10px;
}
.card-image > object,
.card-image img {
  margin: auto;
  height: 100%;
  max-height: 300px;
}
.card-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 0.4rem;
  height: 30%;
}
.img-text {
  position: absolute;
  text-align: center;
  left: 15%;
  top: 30%;
  color: white;
  width: 70%;
}
.img-text > .title {
  font-weight: 700;
}
</style>

<template>
  <div>
    <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </b-card-text>

      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div>
  <div>
    <div>
      <b-card-group deck>
        <b-card
            border-variant="primary"
            header="Gestion les commandes"
            header-bg-variant="primary"
            header-text-variant="white"
            align="center"
        >
          <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
        </b-card>

        <b-card border-variant="secondary" header="Ges aux articles" align="center">
          <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
        </b-card>

        <b-card border-variant="secondary" header="secondary" align="center">
          <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
        </b-card>
      </b-card-group>
    </div>
    <div class="mt-3">
      <b-card-group deck>
        <b-card border-variant="info" header="Info" align="center">
          <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
        </b-card>

        <b-card
            border-variant="warning"
            header="Warning"
            header-bg-variant="transparent"
            align="center"
        >
          <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
        </b-card>

        <b-card
            border-variant="danger"
            header="Danger"
            header-border-variant="danger"
            header-text-variant="danger"
            align="center"
        >
          <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
        </b-card>
      </b-card-group>
    </div>
    <div class="mt-3">
      <b-card-group deck class="mb-3">
        <b-card border-variant="light" header="Light" class="text-center">
          <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
        </b-card>

        <b-card border-variant="dark" header="Dark" align="center">
          <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script lang="ts" setup>


</script>


<style scoped>
.product-card {
  margin: 20px;
}
</style>

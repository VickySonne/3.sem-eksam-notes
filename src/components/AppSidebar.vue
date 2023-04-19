<template>
    <aside>
        <div class="menu">
          <h3>fa-house-chimney Overblik</h3>    
          <h3>Sagsstyring</h3>
          <h3>Kasse</h3>
          <h3>Kunder</h3>
          <h3>Varer</h3>
          <h3>Statestik</h3>     
          
          <br>
          <br>

          <h3>Support</h3>
          <h3>Indstillinger</h3>

          <hr class="rounded">

          <h3>Skjul Sidebjælke</h3>
        </div>

    </aside>

</template>

<style lang="scss" scoped>
  aside {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 1rem;

    background-color: #eee;
    width: 300px;

    transition: 0.2 ease-out;

    hr.rounded {
      border-top: 8px solid #bbb;
      border-radius: 5px;
    }

    @media (max-width: 768px){

    }
  }
</style>

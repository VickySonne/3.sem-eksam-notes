<template>
  <header>
    <div class="header-container">
      <div class="st-tekst">
        <p>Team Toaster</p>
        <p>(Kunde nr.:4242)</p>
      </div>

      <div class="midter-tekst">
        <p>344 dage tilbage i prøveperiode med alle funktioner tilgængelige Vælg abonnement</p>
      </div>

      <div class="tredje-tekst">
        <div class="klokke-ikon">klokke</div> 
        <div class="profil">
          <div>person</div>
          <div><p>CuriousDeveloperTestingStuff</p></div>
          <div>pil</div>
        </div>
      </div>

    </div>
  </header>
</template>

<style lang="scss">
header {
    background-color: #eee;
    padding: 1rem;
}

.header-container{
    display: flex; 
    align-items: center;
    width: 100%;
}

.midter-tekst{
    flex-grow: 1;
    text-align: center;
}

.st-tekst{
    flex: 1 1 0%;
}

.tredje-tekst{
    flex: 1 1 0%;

}

.profil{
    display: flex; 
}



</style>
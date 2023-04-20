<template>
  <header>
    <div class="header-container">
      <div class="st-tekst">
        <p><span class="bold">Team Toaster</span></p>
        <p>(Kunde nr.:4242)</p>
      </div>

      <div class="midter-tekst">
        <p><span class="bold">344 dage</span> tilbage i prøveperiode med alle funktioner tilgængelige <span class="abonnement">Vælg abonnement</span></p>
      </div>

      <div class="tredje-tekst">
        <div class="ikon klokke">ikon</div> 
        <div class="profil">
          <div class="ikon">ikon</div>
          <div><p>CuriousDeveloperTestingStuff</p></div>
          <div class="ikon">ikon</div>
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

.st-tekst{
    flex: 2 1 0%;
}

.midter-tekst{
    flex-grow: 1;
    text-align: center;
}

.tredje-tekst{
    flex: 1 1 0%;
    display: flex;
}

.profil{
    display: flex;
    align-items: center;

    &:hover {
      background-color: darkgray;
    }
    cursor: pointer;
}

.klokke{
    &:hover {
      background-color: darkgray;
    }  
    cursor: pointer;
} 

.ikon{
    padding: 10px;
  
}

.bold{
    font-weight: bold;
}

.abonnement{
    text-decoration: underline;
    cursor: pointer;
}


</style>
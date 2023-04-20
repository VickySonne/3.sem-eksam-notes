<template>
    <aside>
        <div class="menu">
          <div>
            <p>Overblik</p>    
            <p>Sagsstyring</p>
            <p>Kasse</p>
            <p>Kunder</p>
            <p>Varer</p>
            <p>Statestik</p>     
          </div>

          <div>
            <p>Support</p>
            <p>Indstillinger</p>
          
            <hr class="rounded">

            <p>Skjul Sidebjælke</p>
           </div>

        </div>

    </aside>

</template>

<style lang="scss" scoped>
  aside {  
    background-color: #eee;
    width: 300px;

    .menu {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    p {
      padding: 16px;
      font-size: 14px;
      margin: 15px;
      color: #1E293B;
      font-weight: bolder;
    }

    p:hover {
      background-color: #1E293B;
      color: #eee;
      margin: 15px;
    }

    br {
      display: block;
      margin: 3rem;
    }

    hr.rounded {
      margin: 15px;
      border-top: 5px solid #bbb;
      border-radius: 5px;
    }

    @media (max-width: 768px){

    }
  }
</style>

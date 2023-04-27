<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
    <div>
        <h3>Varer</h3>

        <div class="titels-container">
            <table>
                <thead>
                <tr>
                    <th>Navn</th>
                    <th>Antal</th>
                    <th>Stk. pris</th>
                    <th>Total</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>Centurion Bike</td>
                    <td>1</td>
                    <td>100</td>
                    <td>100</td>
                </tr>

                <tr>
                    <td>Trek Bike</td>
                    <td>2</td>
                    <td>100</td>
                    <td>200</td>
                </tr>
                </tbody>
            </table>

            <div class="search-product">
                <div class="search-bar">
                    <font-awesome-icon icon="magnifying-glass"/>
                    <input type="search" placeholder="Søg på varer...">
                </div>

                <button class="add-product">Tilføj vare</button>
                <p>Tilføj kundeenhed</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.titels-container {
  background-color: rgb(229 231 235);
}

.search-product {
  display: flex;
  gap: 1rem;
  padding: 1rem;

  p {
    display: flex;
    align-items: center;
    cursor: pointer;

      &:hover {
          text-decoration: underline;
      }
  }
}

.search-bar {
  align-items: center;
  background-color: white;
  display: flex;
  gap: 1rem;
  padding: 1rem;
}

.add-product {
  cursor: pointer;
  background-color: #1E293B;
  color: white;
  padding: 1rem;

    &:hover {
        background-color: rgb(71 85 105);
    }
}

table {
  width: 100%;

  th {
      font-weight: bold;
    padding: 1rem;
  }

  td {
    padding: 0.5rem 1rem;
  }
}

h3 {
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 1rem;
}
</style>
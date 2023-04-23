<template>
    <h3>Varer</h3>

    <div class="titels-container">
        <table>
            <tr>
                <th>Navn</th>
                <th>Antal</th>
                <th>Stk. pris</th>
                <th>Total</th>
            </tr>
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
        </table>
        <div class="search-product">
            <div class="search-bar">
                <i>i</i>
                <input type="search" placeholder="Søg på varer...">
            </div>
            <button class="add-product">Tilføj vare</button>
        </div>
    </div>

</template>

<style lang="scss">
    .titels-container{
        background-color: rgb(209, 213, 219);
        padding: 20px 20px;
    }

    .search-product{
        display: flex;
        flex-direction: row;
    }

    .search-bar{
        background-color: white;
        display: flex;
        align-items: center;
        margin-right: 5px;
    }

    .add-product{
        cursor: pointer; 
        background-color: #1E293B;   
        color: white;
        padding: 10px;  
        margin-left: 5px; 
    }

</style>
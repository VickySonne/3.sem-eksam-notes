<template>
    <h3>Varer</h3>

    <div class="titels-container">
        <table>
            <thead>
                <th>Navn</th>
                <th>Antal</th>
                <th>Stk. pris</th>
                <th>Total</th>
            </thead>
                <tbody>
                    <td>Centurion Bike</td>
                    <td>1</td>
                    <td>100</td>
                    <td>100</td>
                </tbody>
                <tbody>
                    <td>Trek Bike</td>
                    <td>2</td>
                    <td>100</td>
                    <td>200</td>
                </tbody>
        </table>
        <div class="search-product">
            <div class="search-bar">
                <i>i</i>
                <input type="search" placeholder="Søg på varer...">
            </div>
            <button class="add-product">Tilføj vare</button>
            <p>Tilføj kundeenhed</p>
        </div>
    </div>

</template>

<style lang="scss">
    .titels-container{
        background-color: rgb(209, 213, 219);
    }

    .search-product{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        padding: 1rem;
    }

    .search-bar{
        background-color: white;
        display: flex;
        align-items: center;
    }

    .add-product{
        cursor: pointer; 
        background-color: #1E293B;   
        color: white;
        padding: 10px;  
    }

    th{
        font-weight: bold;
    }

    table{
        width: 100%;
        th{
            padding: 1rem;
        }
        td{
            padding: 0.5rem 1rem;
        }
    }

    h3{
        font-weight: 700;
        font-size: 1.125rem;
        margin-bottom: 1rem;
    }

    p{
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    i{
        padding-left: 0.8rem;
        padding-right: 0.8rem;
    }

</style>
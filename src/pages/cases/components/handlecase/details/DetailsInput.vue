<template>
    <div>
        <slot name="label"></slot>
 
        <div>
            <slot></slot>
        </div>
    </div>
 </template>
 
 <style lang="scss" scoped>
    div{
        display: grid;
        gap: var(--default-gap);
    }
 </style>
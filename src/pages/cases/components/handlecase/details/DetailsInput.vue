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
        display: flex;
        flex-direction: column;
        gap: var(--default-gap);
    }
 </style>
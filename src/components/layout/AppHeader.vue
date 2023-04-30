<script setup>
import {ref} from "vue";

const dropdownActivated = ref(false);

const toggleDropdown = () => {
    dropdownActivated.value = !dropdownActivated.value;
}
</script>

<template>
  <header>
      <div>
          <p>Team Toaster</p>
          <small>(kunde nr.: 4242)</small>
      </div>

      <div>
          <p><span>344 dage</span> tilbage i prøveperiode med alle funktioner tilgængelige.&nbsp;</p>
          <a href="#">Vælg abonnement</a>
      </div>

      <div>
        <div class="notifications">
            <font-awesome-icon icon="bell" />
        </div>

        <div class="profile" :class="{active: dropdownActivated}" @click="toggleDropdown">
          <font-awesome-icon icon="user" />
          <p>CuriousDeveloperTestingStuff</p>
          <font-awesome-icon icon="angle-down" />

            <div class="dropdown">
                <div>
                    <font-awesome-icon icon="people-arrows" />
                    <p>Skift bruger</p>
                </div>

                <div>
                    <font-awesome-icon icon="arrow-right-from-bracket" />
                    <p>Log ud</p>
                </div>
            </div>
        </div>
      </div>
  </header>
</template>

<style lang="scss" scoped>
.dropdown {
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  display: none;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  z-index: 1;

  & > div {
    align-items: center;
    display: flex;
    gap: 1rem;
    padding: var(--default-padding);

    &:hover {
      background-color: var(--bg-primary);
      border-radius: var(--border-radius);
      color: var(--text-secondary);
      cursor: pointer;
    }

    p {
      font-weight: 600;
    }
  }
}

header {
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding: 1rem;

  // Customer information
  & > :nth-child(1) {
    flex: 1 1 0;

    p {
      font-weight: 600;
    }

    small {
      font-size: 0.875rem;
    }
  }

  // Trial information
  & > :nth-child(2) {
    display: flex;
    font-size: 0.875rem;

    a {
      text-decoration: underline;
    }

    a,
    span {
      font-weight: 600;
    }
  }

  // Profile menu
  & > :nth-child(3) {
    display: flex;
    flex: 1 1 0;
    gap: 0.5rem;
    justify-content: flex-end;

    .profile {
      align-items: center;
      display: flex;
      gap: 1rem;
      position: relative;

      &.active {
        .dropdown {
          display: block;
        }
      }
    }

    .profile,
    .notifications {
      padding: 1rem;

      &.active,
      &:hover {
        background-color: var(--bg-primary);
        border-radius: var(--border-radius);
        cursor: pointer;

        & > *:not(.dropdown) {
          color: var(--text-secondary);
        }
      }
    }
  }
}
</style>
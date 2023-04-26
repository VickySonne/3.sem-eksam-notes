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

        <div class="profile">
          <font-awesome-icon icon="user" />
          <p>CuriousDeveloperTestingStuff</p>
          <font-awesome-icon icon="angle-down" />
        </div>
      </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  align-items: center;
  display: flex;
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
    }

    .profile,
    .notifications {
      padding: 1rem;

      &:hover {
        background-color: var(--bg-primary);
        border-radius: var(--border-radius);
        color: var(--text-secondary);
        cursor: pointer;
      }
    }
  }
}
</style>
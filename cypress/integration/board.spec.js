describe('Board Page', function () {
  it('renders a board with its columns and cards in their position', function () {
    cy.get('[data-testid^="column"]').should('have.length', 2)
    cy.get('[data-testid^="column"]:first > div:eq(0)').should('have.text', 'Column Backlog')
    cy.get('[data-testid^="column"]:last > div:eq(0)').should('have.text', 'Column Doing')

    cy.get('[data-testid^="card"]').should('have.length', 9)

    cy.get('[data-testid^="column"]:first [data-testid^="card"]').should('have.length', 8)
    cy.get('[data-testid^="column"]:first [data-testid^="card"]:first').contains(/Card title 1/)
    cy.get('[data-testid^="column"]:first [data-testid^="card"]:last').contains(/Card title 8/)

    cy.get('[data-testid^="column"]:last [data-testid^="card"]').should('have.length', 1)
    cy.get('[data-testid^="column"]:last [data-testid^="card"]:first').contains(/Card title 9/)
    cy.get('[data-testid^="column"]:last [data-testid^="card"]:last').contains(/Card title 9/)
  })

  describe('about the card moving', () => {
    describe('when the card is not blocked for moving', () => {
      describe('when the user moves a card in the same column', () => {
        beforeEach(() => {
          const firstCardSelector = '[data-testid^="column"]:eq(0) [data-testid^="card"]:eq(0)'
          cy.get(firstCardSelector)
            .trigger('keydown', { keyCode: 32, which: 32 })
            .trigger('keydown', { keyCode: 40, which: 40, force: true })
            .trigger('keydown', { keyCode: 40, which: 40, force: true })
            .trigger('keydown', { keyCode: 32, which: 32, force: true })
        })

        it('moves the cards to another position in the same column', () => {
          cy.get('[data-testid^="column"]:eq(0) [data-testid^="card"]').should('have.length', 8)
          cy.get('[data-testid^="column"]:eq(1) [data-testid^="card"]').should('have.length', 1)
          cy.get('[data-testid^="column"]:eq(0) [data-testid^="card"]:eq(0)').contains(/Card title 2/)
          cy.get('[data-testid^="column"]:eq(0) [data-testid^="card"]:eq(1)').contains(/Card title 3/)
          cy.get('[data-testid^="column"]:eq(0) [data-testid^="card"]:eq(2)').contains(/Card title 1/)
        })
      })

      describe('when the user moves a card from a column to another column', () => {
        beforeEach(() => {
          const firstCardSelector = '[data-testid^="column"]:eq(0) [data-testid^="card"]:eq(0)'
          cy.get(firstCardSelector)
            .trigger('keydown', { keyCode: 32, which: 32 })
            .trigger('keydown', { keyCode: 39, which: 39, force: true })
            .trigger('keydown', { keyCode: 32, which: 32, force: true })
        })

        it('moves the cards to another column', () => {
          cy.get('[data-testid^="column"]:eq(0) [data-testid^="card"]').should('have.length', 7)
          cy.get('[data-testid^="column"]:eq(1) [data-testid^="card"]').should('have.length', 2)
        })
      })
    })

    describe('when the card is blocked for moving', () => {
      beforeEach(() => cy.visit('/?disableCardDrag=true'))

      describe('when the user tries to move a card', () => {
        beforeEach(() => {
          const firstCardSelector = '[data-testid^="column"]:eq(0) [data-testid^="card"]:eq(0)'
          cy.get(firstCardSelector)
            .trigger('keydown', { keyCode: 32, which: 32 })
            .trigger('keydown', { keyCode: 40, which: 40, force: true })
            .trigger('keydown', { keyCode: 40, which: 40, force: true })
            .trigger('keydown', { keyCode: 32, which: 32, force: true })
        })

        it('does not move the card', () => {
          cy.get('[data-testid^="column"]:eq(0) [data-testid^="card"]').should('have.length', 8)
          cy.get('[data-testid^="column"]:eq(1) [data-testid^="card"]').should('have.length', 1)
          cy.get('[data-testid^="column"]:eq(0) [data-testid^="card"]:eq(0)').contains(/Card title 1/)
          cy.get('[data-testid^="column"]:eq(0) [data-testid^="card"]:eq(1)').contains(/Card title 2/)
          cy.get('[data-testid^="column"]:eq(0) [data-testid^="card"]:eq(2)').contains(/Card title 3/)
        })
      })
    })
  })

  describe('about the column moving', () => {
    describe('when the column is not blocked for moving', () => {
      describe('when the user moves a column to another position', () => {
        beforeEach(() => {
          const firstColumn = '[data-testid^="column"]:eq(0) > div:eq(0)'
          cy.get(firstColumn)
            .trigger('keydown', { keyCode: 32, which: 32 })
            .trigger('keydown', { keyCode: 39, which: 39, force: true })
            .trigger('keydown', { keyCode: 32, which: 32, force: true })
        })

        it('moves the column to the specified position', () => {
          cy.get('[data-testid^="column"]:eq(0) > div:eq(0)').should('have.text', 'Column Doing')
          cy.get('[data-testid^="column"]:eq(1) > div:eq(0)').should('have.text', 'Column Backlog')
        })
      })
    })

    describe('when the column is blocked for moving', () => {
      beforeEach(() => cy.visit('/?disableColumnDrag=true'))

      describe('when the user tries to move a column', () => {
        beforeEach(() => {
          const firstColumn = '[data-testid^="column"]:eq(0) > div:eq(0)'
          cy.get(firstColumn)
            .trigger('keydown', { keyCode: 32, which: 32 })
            .trigger('keydown', { keyCode: 39, which: 39, force: true })
            .trigger('keydown', { keyCode: 32, which: 32, force: true })
        })

        it('does not move the column', () => {
          cy.get('[data-testid^="column"]:eq(0) > div:eq(0)').should('have.text', 'Column Backlog')
          cy.get('[data-testid^="column"]:eq(1) > div:eq(0)').should('have.text', 'Column Doing')
        })
      })
    })
  })
})

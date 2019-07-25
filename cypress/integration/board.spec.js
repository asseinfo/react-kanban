describe('Board Page', function () {
  it('renders a board with its lanes and cards', function () {
    cy.get('[data-testid="lane"]').should('have.length', 2)
    cy.get('[data-testid="lane"]:eq(0) > div:eq(0)').should('have.text', 'Lane Backlog')
    cy.get('[data-testid="lane"]:eq(1) > div:eq(0)').should('have.text', 'Lane Doing')

    cy.get('[data-testid="card"]').should('have.length', 9)
    cy.get('[data-testid="lane"]:eq(0) [data-testid="card"]')
      .should('have.length', 8)
    cy.get('[data-testid="lane"]:eq(1) [data-testid="card"]')
      .should('have.length', 1)

    cy.get('[data-testid="lane"]:eq(0) [data-testid="card"]:eq(0)')
      .contains(/Card title 1/)
    cy.get('[data-testid="lane"]:eq(0) [data-testid="card"]:eq(1)')
      .contains(/Card title 2/)
    cy.get('[data-testid="lane"]:eq(0) [data-testid="card"]:eq(2)')
      .contains(/Card title 3/)

    cy.get('[data-testid="lane"]:eq(1) [data-testid="card"]:eq(0)')
      .contains(/Card title 9/)
  })

  describe('about the card moving', () => {
    describe('when the card is not blocked for moving', () => {
      describe('when the user moves a card in the same lane', () => {
        beforeEach(() => {
          const firstCardSelector = '[data-testid="lane"]:eq(0) [data-testid="card"]:eq(0)'
          cy.get(firstCardSelector)
            .trigger('keydown', { keyCode: 32, which: 32 })
            .trigger('keydown', { keyCode: 40, which: 40, force: true })
            .wait(500)
            .trigger('keydown', { keyCode: 40, which: 40, force: true })
            .wait(500)
            .trigger('keydown', { keyCode: 32, which: 32, force: true })
        })

        it('moves the cards to another position in the same lane', () => {
          cy.get('[data-testid="lane"]:eq(0) [data-testid="card"]')
            .should('have.length', 8)
          cy.get('[data-testid="lane"]:eq(1) [data-testid="card"]')
            .should('have.length', 1)
          cy.get('[data-testid="lane"]:eq(0) [data-testid="card"]:eq(0)')
            .contains(/Card title 2/)
          cy.get('[data-testid="lane"]:eq(0) [data-testid="card"]:eq(1)')
            .contains(/Card title 3/)
          cy.get('[data-testid="lane"]:eq(0) [data-testid="card"]:eq(2)')
            .contains(/Card title 1/)
        })
      })

      describe('when the user moves a card from a lane to another lane', () => {
        beforeEach(() => {
          const firstCardSelector = '[data-testid="lane"]:eq(0) [data-testid="card"]:eq(0)'
          cy.get(firstCardSelector)
            .trigger('keydown', { keyCode: 32, which: 32 })
            .trigger('keydown', { keyCode: 39, which: 39, force: true })
            .wait(500)
            .trigger('keydown', { keyCode: 32, which: 32, force: true })
        })

        it('moves the cards to another lane', () => {
          cy.get('[data-testid="lane"]:eq(0) [data-testid="card"]')
            .should('have.length', 7)
          cy.get('[data-testid="lane"]:eq(1) [data-testid="card"]')
            .should('have.length', 2)
        })
      })
    })

    describe('when the card is blocked for moving', () => {
      beforeEach(() => cy.visit('/?disableCardDrag=true'))

      describe('when the user tries to move a card', () => {
        beforeEach(() => {
          const firstCardSelector = '[data-testid="lane"]:eq(0) [data-testid="card"]:eq(0)'
          cy.get(firstCardSelector)
            .trigger('keydown', { keyCode: 32, which: 32 })
            .trigger('keydown', { keyCode: 40, which: 40, force: true })
            .wait(500)
            .trigger('keydown', { keyCode: 40, which: 40, force: true })
            .wait(500)
            .trigger('keydown', { keyCode: 32, which: 32, force: true })
        })

        it('does not move the card', () => {
          cy.get('[data-testid="lane"]:eq(0) [data-testid="card"]')
            .should('have.length', 8)
          cy.get('[data-testid="lane"]:eq(1) [data-testid="card"]')
            .should('have.length', 1)
          cy.get('[data-testid="lane"]:eq(0) [data-testid="card"]:eq(0)')
            .contains(/Card title 1/)
          cy.get('[data-testid="lane"]:eq(0) [data-testid="card"]:eq(1)')
            .contains(/Card title 2/)
          cy.get('[data-testid="lane"]:eq(0) [data-testid="card"]:eq(2)')
            .contains(/Card title 3/)
        })
      })
    })
  })

  describe('about the lane moving', () => {
    describe('when the lane is not blocked for moving', () => {
      describe('when the user moves a lane to another position', () => {
        beforeEach(() => {
          const firstLane = '[data-testid="lane"]:eq(0) > div:eq(0)'
          cy.get(firstLane)
            .trigger('keydown', { keyCode: 32, which: 32 })
            .trigger('keydown', { keyCode: 39, which: 39, force: true })
            .wait(500)
            .trigger('keydown', { keyCode: 32, which: 32, force: true })
        })

        it('moves the lane to the specified position', () => {
          cy.get('[data-testid="lane"]:eq(0) > div:eq(0)').should('have.text', 'Lane Doing')
          cy.get('[data-testid="lane"]:eq(1) > div:eq(0)').should('have.text', 'Lane Backlog')
        })
      })
    })

    describe('when the lane is blocked for moving', () => {
      beforeEach(() => cy.visit('/?disableLaneDrag=true'))

      describe('when the user tries to move a lane', () => {
        beforeEach(() => {
          const firstLane = '[data-testid="lane"]:eq(0) > div:eq(0)'
          cy.get(firstLane)
            .trigger('keydown', { keyCode: 32, which: 32 })
            .trigger('keydown', { keyCode: 39, which: 39, force: true })
            .wait(500)
            .trigger('keydown', { keyCode: 32, which: 32, force: true })
        })

        it('does not move the lane', () => {
          cy.get('[data-testid="lane"]:eq(0) > div:eq(0)').should('have.text', 'Lane Backlog')
          cy.get('[data-testid="lane"]:eq(1) > div:eq(0)').should('have.text', 'Lane Doing')
        })
      })
    })
  })
})

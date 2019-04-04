describe('Board Page', function () {
  it('renders a board with its lanes and cards', function () {
    cy.get('[data-react-beautiful-dnd-droppable="0"]').should('have.length', 2)

    cy.get('[data-react-beautiful-dnd-draggable="0"]').should('have.length', 9)
    cy.get('[data-react-beautiful-dnd-droppable="0"]:eq(0) [data-react-beautiful-dnd-draggable="0"]')
      .should('have.length', 8)
    cy.get('[data-react-beautiful-dnd-droppable="0"]:eq(1) [data-react-beautiful-dnd-draggable="0"]')
      .should('have.length', 1)
  })

  describe('about the card moving', () => {
    describe('when the user moves a card in the same lane', () => {
      beforeEach(() => {
        const firstCardSelector = '[data-react-beautiful-dnd-droppable="0"]:eq(0) [data-react-beautiful-dnd-draggable="0"]:eq(0)'
        cy.get(firstCardSelector)
          .trigger('keydown', { keyCode: 32, which: 32 })
          .trigger('keydown', { keyCode: 40, which: 40, force: true })
          .wait(500)
          .trigger('keydown', { keyCode: 32, which: 32, force: true })
      })

      it('moves the cards to another position in the same lane', () => {
        cy.get('[data-react-beautiful-dnd-droppable="0"]:eq(0) [data-react-beautiful-dnd-draggable="0"]')
          .should('have.length', 8)
        cy.get('[data-react-beautiful-dnd-droppable="0"]:eq(1) [data-react-beautiful-dnd-draggable="0"]')
          .should('have.length', 1)
        cy.get('[data-react-beautiful-dnd-droppable="0"]:eq(0) [data-react-beautiful-dnd-draggable="0"]:eq(0)')
          .contains(/Card title 2/)
        cy.get('[data-react-beautiful-dnd-droppable="0"]:eq(0) [data-react-beautiful-dnd-draggable="0"]:eq(1)')
          .contains(/Card title 1/)
      })
    })

    describe('when the user moves a card from a lane to another lane', () => {
      beforeEach(() => {
        const firstCardSelector = '[data-react-beautiful-dnd-droppable="0"]:eq(0) [data-react-beautiful-dnd-draggable="0"]:eq(0)'
        cy.get(firstCardSelector)
          .trigger('keydown', { keyCode: 32, which: 32 })
          .trigger('keydown', { keyCode: 39, which: 39, force: true })
          .wait(500)
          .trigger('keydown', { keyCode: 32, which: 32, force: true })
      })

      it('moves the cards to another lane', () => {
        cy.get('[data-react-beautiful-dnd-droppable="0"]:eq(0) [data-react-beautiful-dnd-draggable="0"]')
          .should('have.length', 7)
        cy.get('[data-react-beautiful-dnd-droppable="0"]:eq(1) [data-react-beautiful-dnd-draggable="0"]')
          .should('have.length', 2)
      })
    })
  })
})

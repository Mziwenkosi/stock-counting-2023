document.addEventListener('DOMContentLoaded', function() {
    const itemsContainer = document.querySelector('.items-container');

    function calculateStock(itemContainer) {
        const item = itemContainer.querySelector('.item-input.item-name').value;
        const dispensedAmount = parseFloat(itemContainer.querySelector('.item-input.dispensed-amount').value) || 0;
        const consumed1 = parseFloat(itemContainer.querySelector('.item-input.consumed1').value) || 0;
        const consumed2 = parseFloat(itemContainer.querySelector('.item-input.consumed2').value) || 0;
        const consumed3 = parseFloat(itemContainer.querySelector('.item-input.consumed3').value) || 0;
        const consumed4 = parseFloat(itemContainer.querySelector('.item-input.consumed4').value) || 0;

        const totalConsumed = consumed1 + consumed2 + consumed3 + consumed4;
        const stock = dispensedAmount - totalConsumed;

        return { item, dispensedAmount, stock };
    }

    function createItemContainer() {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container');

        itemContainer.innerHTML = `
            <label for="item">Item Name:</label>
            <input type="text" class="item-input item-name" placeholder="Enter item name" required>

            <label for="dispensed">Dispensed Amount:</label>
            <input type="number" class="item-input dispensed-amount" placeholder="Enter dispensed amount" required>

            <label for="consumed1">Consumed 1:</label>
            <input type="number" class="item-input consumed1" placeholder="Consumed 1" required>

            <label for="consumed2">Consumed 2:</label>
            <input type="number" class="item-input consumed2" placeholder="Consumed 2" required>

            <label for="consumed3">Consumed 3:</label>
            <input type="number" class="item-input consumed3" placeholder="Consumed 3" required>

            <label for="consumed4">Consumed 4:</label>
            <input type="number" class="item-input consumed4" placeholder="Consumed 4" required>

            <button class="calculate">Calculate</button>
            <button class="clear">Clear</button>
            <button class="edit">Edit</button>
            <button class="toggle">Toggle Details</button>
            <button class="delete">Delete Item</button>
            <div class="item-details" style="display: none;"></div>
        `;

        return itemContainer;
    }

    function updateItemDetails(itemContainer, item, dispensedAmount, stock) {
        const itemDetails = itemContainer.querySelector('.item-details');
        itemDetails.innerHTML = `
            <p class="item-info">Item Name: ${item || 'N/A'}</p>
            <p class="item-info">Dispensed Amount: ${dispensedAmount || 'N/A'}</p>
            <p class="item-info">Total Stock: ${stock || 'N/A'}</p>
        `;
    }

    function toggleItemDetailsAndInputs(itemContainer) {
        const itemDetails = itemContainer.querySelector('.item-details');
        const itemInputs = itemContainer.querySelectorAll('.item-input');

        if (itemDetails.style.display === 'none' || itemDetails.style.display === '') {
            itemDetails.style.display = 'block';
            for (const input of itemInputs) {
                input.disabled = false;
            }
        } else {
            itemDetails.style.display = 'none';
            for (const input of itemInputs) {
                input.disabled = true;
            }
        }
    }

    function clearItemFields(itemContainer) {
        const itemInputs = itemContainer.querySelectorAll('.item-input');
        for (const input of itemInputs) {
            input.value = '';
        }

        // Hide the details when clearing the fields
        const itemDetails = itemContainer.querySelector('.item-details');
        itemDetails.style.display = 'none';
    }

    function deleteItem(itemContainer) {
        itemContainer.remove();
    }

    function addNewItem() {
        const newItemContainer = createItemContainer();

        newItemContainer.querySelector('.calculate').addEventListener('click', function() {
            const { item, dispensedAmount, stock } = calculateStock(newItemContainer);
            updateItemDetails(newItemContainer, item, dispensedAmount, stock);

            // Hide the details and disable inputs after calculating
            toggleItemDetailsAndInputs(newItemContainer);
        });

        newItemContainer.querySelector('.clear').addEventListener('click', function() {
            clearItemFields(newItemContainer);
        });

        newItemContainer.querySelector('.edit').addEventListener('click', function() {
            toggleItemDetailsAndInputs(newItemContainer);
        });

        newItemContainer.querySelector('.toggle').addEventListener('click', function() {
            toggleItemDetailsAndInputs(newItemContainer);
        });

        newItemContainer.querySelector('.delete').addEventListener('click', function() {
            deleteItem(newItemContainer);
        });

        itemsContainer.appendChild(newItemContainer);
    }

    document.querySelector('.add-item').addEventListener('click', function() {
        addNewItem();
    });
});

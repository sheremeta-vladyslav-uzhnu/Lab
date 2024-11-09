document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("userList");
    const searchInput = document.getElementById("search");
    const roleFilter = document.getElementById("roleFilter");
    const statusFilter = document.getElementById("statusFilter");
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    const closeModal = document.getElementById("closeModal");

    let users = [];

    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            users = data;
            displayUsers(users);
        })
        .catch(error => {
            userList.innerHTML = "<p>Помилка завантаження даних.</p>";
        });

    function displayUsers(users) {
        userList.innerHTML = "";
        users.forEach(user => {
            const userCard = document.createElement("div");
            userCard.classList.add("user-card");
            userCard.dataset.status = user.status;

            // Основна інформація
            userCard.innerHTML = `
                <h2>${user.fullName}</h2>
                <p>Username: ${user.username}</p>
                <p>Роль: ${user.role}</p>
                <p>Статус: ${user.status}</p>
                <p>Дата реєстрації: ${new Date(user.registrationDate).toLocaleDateString()}</p>
                <p class="email" style="display: none;">Email: ${user.email}</p>
            `;

            // Події наведення
            userCard.addEventListener("mouseover", () => {
                const emailInfo = userCard.querySelector(".email");
                emailInfo.style.display = "block";
            });

            userCard.addEventListener("mouseout", () => {
                const emailInfo = userCard.querySelector(".email");
                emailInfo.style.display = "none";
            });

            // Відкриття модального вікна
            userCard.addEventListener("click", () => openModal(user));
            userList.appendChild(userCard);
        });
    }

    function openModal(user) {
        modalContent.innerHTML = `
            <h2>${user.username}</h2>
            <p>Повне ім'я: ${user.fullName}</p>
            <p>Роль: ${user.role}</p>
            <p>Статус: ${user.status}</p>
            <p>Email: ${user.email}</p>
            <p>Дата реєстрації: ${new Date(user.registrationDate).toLocaleDateString()}</p>
        `;
        modal.style.display = "block";
    }

    closeModal.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    searchInput.addEventListener("input", filterUsers);
    roleFilter.addEventListener("change", filterUsers);
    statusFilter.addEventListener("change", filterUsers);

    function filterUsers() {
        const searchText = searchInput.value.toLowerCase();
        const selectedRole = roleFilter.value;
        const selectedStatus = statusFilter.value;

        const filteredUsers = users.filter(user => {
            return (
                (user.username.toLowerCase().includes(searchText) || user.fullName.toLowerCase().includes(searchText)) &&
                (selectedRole === "" || user.role === selectedRole) &&
                (selectedStatus === "" || user.status === selectedStatus)
            );
        });

        displayUsers(filteredUsers);
    }
});

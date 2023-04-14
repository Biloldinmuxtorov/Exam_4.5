const div = document.querySelector(".login-page");
const main = document.querySelector(".all");
const email = document.querySelector(".email");
const searchInput = document.querySelector("#ss");
const addname = document.querySelector(".addname");
const adddate = document.querySelector(".adddate");
const addparant = document.querySelector(".addparant");
const addcity = document.querySelector(".addcity");
const addphone = document.querySelector(".addphone");
const addemail = document.querySelector(".addemail");
const addpassword = document.querySelector(".addpassword");
const send = document.querySelector("#send");
let usersd = [];
const password = document.querySelector(".password");
const st = document.querySelector(".st");
const table = document.querySelector(".hh");
const name = localStorage.getItem("name")
  ? localStorage.getItem("name")
  : undefined;
const loginbtn = document.querySelector(".login-n");
document.querySelector("#pro").innerHTML = name;

if (!name) {
  div.style.display = "block";
  main.style.display = "none";
} else {
  div.style.display = "none";
  main.style.display = "flex";
}

loginbtn.addEventListener("click", async () => {
  if (email.value.length === 0 || password.value.length === 0) {
    return alert("Please enter your email address and password");
  }

  try {
    const data = {
      email: email.value,
      password: password.value,
    };
    const rawResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
      
    );
    const content = await rawResponse.json();
    localStorage.setItem("name", email.value);

    div.style.display = "none";
    main.style.display = "flex";
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
});

fetch("http://localhost:3000/users")
  .then((response) => response.json())
  .then((data) => {
    usersd = data;
    secren(usersd);
  })
  .catch((error) => console.error(error));

function renderUsers(users) {
  table.innerHTML = "";
  users.forEach((e) => {
    const tr = document.createElement("tr");
    table.appendChild(tr);
    tr.className = "tr";
    tr.innerHTML = `
    <th id="${e.id}" scope="row"><input type="checkbox" /></th>
    <td>${e.name}</td>
    <td>${e.id}</td>
    <td>${e.address.zipcode}</td>
        <td>${e.website}</td>
        <td>${e.address.city}</td>
        <td>
        <img id="phone" data-id="${e.phone}" class="mx-2" src="./images/tel.png" alt="" />
        <img id="email" data-id="${e.email}" src="/images/chekc.png" alt="" />
        </td>
        <td>
        <button class="btn btn-danger">V!! A</button>
        </td>
        <td>
        <button id='deletebtn' class="btn btn-outline-danger" data-id="${e.id}">Delete</button>
        </td>
    </tr>

        `;
  });
  const emailBtn = document.querySelectorAll("#email");
  const phoneBtn = document.querySelectorAll("#phone");

  emailBtn.forEach((e) => {
    e.addEventListener("click", () => {
      const email = e.dataset.id;
      alert(`${email}`);
    });
  });

  phoneBtn.forEach((e) => {
    e.addEventListener("click", () => {
      const phone = e.dataset.id;
      alert(`${phone}`);
    });
  });

  const deleteBtn = document.querySelectorAll("#deletebtn");
  deleteBtn.forEach((e) => {
    e.addEventListener("click", () => {
      const userId = e.dataset.id;
      fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
      })
        .then(() => e.closest(".tr").remove())
        .catch((error) => console.error(error));
    });
  });
}

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredUsers = usersd.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );
  renderUsers(filteredUsers);
});

send.addEventListener("click", async () => {
  try {
    if (
      addname.value.length === 0 ||
      adddate.value.length === 0 ||
      addparant.value.length === 0 ||
      addcity.value.length === 0 ||
      addphone.value.length === 0 ||
      addemail.value.length === 0
    ) {
      return alert("Please enter  email address and password");
    }

    const data = {
      name: addname.value,
      email: addemail.value,
      address: {
        city: addcity.value,
        zipcode: "45169",
      },
      email: addemail.value,
      phone: addphone.value,
      website: "jacynthe.com",
    };
    window.location.href = "#";
    const rawResponse = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await rawResponse.json();
    alert("Success adding");
  } catch (error) {
    console.log(error);
  }
});

function secren(danger) {
  if (searchInput.value.length == 0) {
    danger.forEach((e) => {
      const tr = document.createElement("tr");
      table.appendChild(tr);
      tr.className = "tr";
      tr.innerHTML = `
        <th id="${e.id}" scope="row"><input type="checkbox" /></th>
        <td>${e.name}</td>
        <td>${e.id}</td>
        <td>${e.address.zipcode}</td>
            <td>${e.website}</td>
            <td>${e.address.city}</td>
            <td>
            <img id="phone" data-id="${e.phone}" class="mx-2" src="./images/tel.png" alt="" />
            <img id="email" data-id="${e.email}" src="/images/chekc.png" alt="" />
            </td>
            <td>
            <button class="btn btn-danger">V!! A</button>
            </td>
            <td>
            <button id='deletebtn' class="btn btn-outline-danger" data-id="${e.id}">Delete</button>
            </td>
        </tr>
    
            `;
    });
    const emailBtn = document.querySelectorAll("#email");
    const phoneBtn = document.querySelectorAll("#phone");
  
    emailBtn.forEach((e) => {
      e.addEventListener("click", () => {
        const email = e.dataset.id;
        alert(`${email}`);
      });
    });
  
    phoneBtn.forEach((e) => {
      e.addEventListener("click", () => {
        const phone = e.dataset.id;
        alert(`${phone}`);
      });
    });
  
    const deleteBtn = document.querySelectorAll("#deletebtn");
    deleteBtn.forEach((e) => {
      e.addEventListener("click", () => {
        const userId = e.dataset.id;
        fetch(`http://localhost:3000/users/${userId}`, {
          method: "DELETE",
        })
          .then(() => e.closest(".tr").remove())
          .catch((error) => console.error(error));
      });
    });
  }
}

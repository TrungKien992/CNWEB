document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    function renderCart() {
        const tbody = document.querySelector("tbody");
        const totalProductElement = document.querySelector(".total-product");
        const totalPriceElement = document.querySelector(".total-price");
        const finalPriceElement = document.querySelector(".final-price");

        let totalProduct = 0;
        let totalPrice = 0;

        tbody.innerHTML = ""; // Xóa nội dung cũ trong bảng

        cart.forEach((item, index) => {
            const { name, price, quantity, img } = item;
            const totalItemPrice = price * quantity;

            totalProduct += quantity; // Cộng tổng số lượng sản phẩm
            totalPrice += totalItemPrice; // Cộng tổng giá tiền

            const row = `
                <tr>
                    <td class="text-start d-flex align-items-center">
                        <img src="${item.image || '../img/default-image.png'}" alt="${item.name}" width="50" class="me-3 ">
                        <div class="ffff">
                            <div>${item.name}</div>
                            <div>Size: ${item.size}</div>
                            <div>Màu: ${item.color}</div>
                        </div>
                    </td>
                    <td class="text-center">
                        <span class="spanquantity">${item.quantity}</span>
                    </td>
                    <td class="text-end">${item.price.toLocaleString()} đ</td>
                    <td class="text-end">${(item.price * item.quantity).toLocaleString()} đ</td>
                    <td class="text-end">
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

        // Cập nhật tổng số lượng sản phẩm hiển thị trong tiêu đề
        totalProductElement.textContent = totalProduct;
        totalPriceElement.textContent = totalPrice.toLocaleString() + " ₫";

        // Thành tiền = Tổng tiền + phí vận chuyển cố định 30,000 ₫
        const shippingFee = 30000;
        const finalPrice = totalPrice + shippingFee;
        finalPriceElement.textContent = finalPrice.toLocaleString() + " ₫";

    }

    renderCart();

    document.querySelector("input[value='ĐẶT HÀNG']").addEventListener("click", function () {
        let email = document.getElementById("email").value;
        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let city = document.getElementById("city").value;
        let district = document.getElementById("district").value;
        let address = document.getElementById("address").value;
        let ward = document.getElementById("ward").value;
        let shipping = document.querySelector("input[name='shipping']:checked");
        let payment = document.querySelector("input[name='payment']:checked");
    
        let missingFields = [];
    
        if (!email) missingFields.push("Địa chỉ email");
        if (!name) missingFields.push("Họ và tên");
        if (!phone) missingFields.push("Số điện thoại");
        if (!city) missingFields.push("Tỉnh/Thành phố");
        if (!district) missingFields.push("Quận/Huyện");
        if (!ward) missingFields.push("Phường/Xã");
        if (!address) missingFields.push("Địa chỉ đường");
        if (!shipping) missingFields.push("Phương thức vận chuyển");
        if (!payment) missingFields.push("Phương thức thanh toán");
    
        if (missingFields.length > 0) {
            alert("Vui lòng điền đầy đủ thông tin:\n" + missingFields.join(", "));
        } else {
            alert("Đặt hàng thành công");
            localStorage.removeItem("cart");
            window.location.href = "Trangchu.html";
        }
    });
});
console.log("Products frontend javascript file");

$(function() {
    $(".product-collection").on("change", () => {
        const selectedValue = $(".product-collection").val();
        if(selectedValue === "DRINK") {
            $("#product-collection").hide();
            $("#product-volume").show();
        } else {
            $("#product-volume").hide();
            $("#product-collection").show();
        }
    });
    $("#process-btn").on("click", () => {
        $(".dish-container").slideToggle(500);
        $("#process-btn").css("display", "none")
    });

    $("#cancel-btn").on("click", () => {
        $(".dish-container").slideToggle(100);
        $("#process-btn").css("display", "flex")
    });

    $(".new-product-status").on("change", async function(e) {
        const id  = e.target.id;
        const productStatus = $(`#${id}.new-product-status`).val();
        try {
            const response = await axios.post(`/admin/product/${id}`, {
                productStatus: productStatus,
            });
            console.log("response",response);
            const result = response.data;
            if( result.data) {
                $(".new-product-status").blur();
            } else {
                alert("Product update failed!");
            }
        } catch(err) {
            console.log(err);
            alert("Product update failed!");

        }
    });

    // Edit product button
    $(".edit-product-btn").on("click", async function() {
        const productId = $(this).data("id");
        try {
            // Get product data (you need to add this endpoint)
            const response = await axios.get(`/admin/product/single/${productId}`);
            const product = response.data;
            
            // Fill edit form
            $("#edit-product-id").val(product._id);
            $("#edit-product-name").val(product.productName);
            $("#edit-product-price").val(product.productPrice);
            $("#edit-product-left-count").val(product.productLeftCount);
            $("#edit-product-collection").val(product.productCollection);
            $("#edit-product-size").val(product.productSize);
            $("#edit-product-desc").val(product.productDesc);
            
            // Show edit form
            $(".edit-dish-container").slideToggle(500);
            $(".dish-container").hide();
            $("#process-btn").css("display", "none");
        } catch (err) {
            console.log(err);
            alert("Failed to load product data!");
        }
    });

    // Edit form submit
    $("#edit-product-form").on("submit", async function(e) {
        e.preventDefault();
        const productId = $("#edit-product-id").val();
        const updateData = {
            productName: $("#edit-product-name").val(),
            productPrice: $("#edit-product-price").val(),
            productLeftCount: $("#edit-product-left-count").val(),
            productCollection: $("#edit-product-collection").val(),
            productSize: $("#edit-product-size").val(),
            productDesc: $("#edit-product-desc").val()
        };

        try {
            const response = await axios.post(`/admin/product/${productId}`, updateData);
            if (response.data) {
                alert("Product updated successfully!");
                location.reload();
            }
        } catch (err) {
            console.log(err);
            alert("Product update failed!");
        }
    });

    // Edit cancel button
    $("#edit-cancel-btn").on("click", function() {
        $(".edit-dish-container").slideToggle(100);
        $("#process-btn").css("display", "flex");
    });

    // Delete product button
    $(".delete-product-btn").on("click", async function() {
        const productId = $(this).data("id");
        try {
            const response = await axios.delete(`/admin/product/${productId}`);
            if (response.data) {
                alert("Product deleted successfully!");
                location.reload();
            }
        } catch (err) {
            console.log(err);
            alert("Product delete failed!");
        }
    });

    // Delete all deleted products button
    $("#delete-all-btn").on("click", async function() {
        if (confirm("Are you sure to delete all products with DELETE status from database?")) {
            try {
                const response = await axios.delete(`/admin/product/delete-all/deleted`);
                if (response.data) {
                    alert(response.data.message);
                    location.reload();
                }
            } catch (err) {
                console.log(err);
                alert("Failed to delete products!");
            }
        }
    });
});

function validateForm () {
    const productName = $(".product-name").val(),
     productPrice = $(".product-price").val(),
     productLeftCount = $(".product-left-count").val(),
     productCollection = $(".product-collection").val(),
     productDesc = $(".product-desc").val(),
     productStatus = $(".product-status").val();

    if( productName === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCollection === "" ||
    productDesc === "" ||
    productStatus === "" 
     ){
        alert("Please insert all details");
        return false;
     } else return true;
}

function previewFileHandler(input, order) {
    const imgClassName = input.className;
    console.log("input:", input)

    const file = $(`.${imgClassName}`).get(0).files[0];
    const fileType = file["type"];
    const validImageType = ["image/jpg", "image/jpeg", "image/png"];

    if(!validImageType.includes(fileType)){
        alert("please insert only jpeg, jpg and png")
    } else {
        if(file){
            const reader = new FileReader();
            reader.onload = function() {
                $(`#image-section-${order}`).attr("src", reader.result)
            };
            reader.readAsDataURL(file)
        }
    }
}
var rootPath;

function init() {

    rootPath = "https://mysite.itvarsity.org/api/mini-blog/";

    document.getElementById("getAll").addEventListener("click", getAllPosts);
    document.getElementById("getLatest").addEventListener("click", getLatestPosts);
    document.getElementById("getPopular").addEventListener("click", getPopularPosts);

    getAllPosts();
}

function getAllPosts() {
    fetchPosts("getAll");
    setActiveLink("getAll");
}

function getPopularPosts() {
    fetchPosts("getPopular");
    setActiveLink("getPopular");
}

function getLatestPosts() {
    fetchPosts("getLatest");
    setActiveLink("getLatest");
}

function fetchPosts(category) {

    fetch(rootPath + "get-posts/?category=" + category)

        .then(response => response.json())

        .then(data => {
            displayPosts(data);
        });

}

function displayPosts(data) {

    var output = "";

    for (var i = 0; i < data.length; i++) {

        output += `

<div class="card mb-4 shadow-sm">

<div class="card-header">
<h4>${data[i][0]}</h4>
</div>

<div class="card-body">

<img src="${rootPath}/uploads/${data[i][3]}" class="card-img-top rounded">

<p class="card-text">
${data[i][1]}
</p>

<hr>

<div class="action-buttons">

<button class="btn btn-outline-danger like-btn">
<i class="far fa-heart"></i>
<span>Like</span>
</button>

<button class="btn btn-outline-primary comment-btn">
<i class="far fa-comment"></i>
<span>Comment</span>
</button>

<button class="btn btn-outline-success share-btn">
<i class="fas fa-share"></i>
<span>Share</span>
</button>

</div>

<div class="comment-box mt-3" style="display:none;">

<textarea class="form-control mb-2 comment-text" rows="2" placeholder="Write a comment..."></textarea>

<button class="btn btn-primary btn-sm post-comment">
Post Comment
</button>

<div class="comments mt-3"></div>

</div>

<div class="mt-3 text-end">
<small class="text-muted">${data[i][2]}</small>
</div>

</div>

</div>

`;

    }

    document.getElementById("posts").innerHTML = output;

    activateButtons();
}

function activateButtons() {

    // LIKE

    document.querySelectorAll(".like-btn").forEach(function(button){

        button.addEventListener("click",function(){

            let icon=this.querySelector("i");

            if(icon.classList.contains("far")){

                icon.classList.remove("far");
                icon.classList.add("fas");

                this.classList.remove("btn-outline-danger");
                this.classList.add("btn-danger");

            }else{

                icon.classList.remove("fas");
                icon.classList.add("far");

                this.classList.remove("btn-danger");
                this.classList.add("btn-outline-danger");

            }

        });

    });

    // COMMENT

    document.querySelectorAll(".comment-btn").forEach(function(button){

        button.addEventListener("click",function(){

            let box=this.parentElement.nextElementSibling;

            if(box.style.display==="none"){

                box.style.display="block";

            }else{

                box.style.display="none";

            }

        });

    });

    // POST COMMENT

    document.querySelectorAll(".post-comment").forEach(function(button){

        button.addEventListener("click",function(){

            let container=this.parentElement;

            let textarea=container.querySelector(".comment-text");

            let comments=container.querySelector(".comments");

            if(textarea.value.trim()!=""){

                comments.innerHTML+=`

<div class="alert alert-light border mb-2">

<strong>You:</strong> ${textarea.value}

</div>

`;

                textarea.value="";

            }

        });

    });

    // SHARE

    document.querySelectorAll(".share-btn").forEach(function(button){

        button.addEventListener("click",function(){

            if(navigator.share){

                navigator.share({

                    title:"Mini Blog",

                    text:"Check out this amazing post!",

                    url:window.location.href

                });

            }else{

                navigator.clipboard.writeText(window.location.href);

                alert("Post link copied to clipboard.");

            }

        });

    });

}

function setActiveLink(id){

    document.getElementById("getAll").classList.remove("active");
    document.getElementById("getLatest").classList.remove("active");
    document.getElementById("getPopular").classList.remove("active");

    document.getElementById(id).classList.add("active");

}
let toolbarHeight = 50;

let div = document.createElement("div");
div.id = "myToolbar";
div.textContent = "Random Petitions";

let st = div.style;
st.padding = "5px";
st.display = "block";
st.top = "0px";
st.left = "0px";
st.width = "100%";
st.height = toolbarHeight + "px";
st.background = "#008800";
st.color = "#FFFFFF";
st.fontSize = "24px";
st.fontFamily = "Helvetica Neue"
st.position = "fixed";

document.body.style.webkitTransform = "translateY(" + toolbarHeight + "px)";
document.documentElement.appendChild(div);

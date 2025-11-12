async function injectComponent(id, file) {
    const el = document.getElementById(id);
    if (!el) return;
    const res = await fetch(file);
    const html = await res.text();
    el.innerHTML = html;

    // execute scripts inside loaded HTML
    const scripts = el.querySelectorAll("script");
    scripts.forEach(oldScript => {
        const newScript = document.createElement("script");
        if (oldScript.src) newScript.src = oldScript.src;
        else newScript.textContent = oldScript.textContent;
        document.body.appendChild(newScript);
        oldScript.remove();
    });
}

// load header & footer
injectComponent("header", "components/header.html");
injectComponent("footer", "components/footer.html");
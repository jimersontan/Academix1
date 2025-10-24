// Simple centered top toast used by multiple components
export function notify(title, message, type = 'success', duration = 2800) {
    const containerId = 'ax-toast-top';
    let c = document.getElementById(containerId);
    if (!c) {
        c = document.createElement('div');
        c.id = containerId;
        // center container in viewport
        c.style.position = 'fixed';
        c.style.top = '50%';
        c.style.left = '50%';
        c.style.transform = 'translate(-50%, -50%)';
        c.style.zIndex = 99999;
        c.style.pointerEvents = 'none';
        document.body.appendChild(c);
    }

    const card = document.createElement('div');
    // larger centered card for clearer visibility
    card.style.width = '620px';
    card.style.maxWidth = '96vw';
    card.style.background = '#0f0f0f';
    card.style.color = '#fff';
    card.style.borderRadius = '10px';
    card.style.padding = '22px 28px';
    card.style.boxShadow = '0 18px 60px rgba(0,0,0,.6)';
    card.style.display = 'flex';
    card.style.flexDirection = 'row';
    card.style.alignItems = 'center';
    card.style.gap = '16px';
    card.style.pointerEvents = 'auto';

    // Check icon box on top
    const iconWrap = document.createElement('div');
    iconWrap.style.width = '48px';
    iconWrap.style.height = '48px';
    iconWrap.style.borderRadius = '8px';
    iconWrap.style.display = 'flex';
    iconWrap.style.alignItems = 'center';
    iconWrap.style.justifyContent = 'center';
    iconWrap.style.background = type === 'success' ? '#4caf50' : '#d32f2f';

    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('width','24'); svg.setAttribute('height','24'); svg.setAttribute('viewBox','0 0 24 24');
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('fill','#fff');
    path.setAttribute('d','M9 16.2l-3.5-3.5L4 14.2 9 19.2 20 8.2 18.6 6.8z');
    svg.appendChild(path);
    iconWrap.appendChild(svg);

    const titleEl = document.createElement('div');
    titleEl.textContent = title;
    titleEl.style.fontWeight = '800';
    titleEl.style.fontSize = '20px';

    const msgEl = document.createElement('div');
    msgEl.textContent = message;
    msgEl.style.fontSize = '16px';
    msgEl.style.opacity = '0.95';
    msgEl.style.marginLeft = '6px';
    msgEl.style.flex = '1';

    const textWrap = document.createElement('div');
    textWrap.style.display = 'flex';
    textWrap.style.flexDirection = 'column';
    textWrap.style.alignItems = 'flex-start';
    textWrap.appendChild(titleEl);
    textWrap.appendChild(msgEl);

    card.appendChild(iconWrap);
    card.appendChild(textWrap);

    // animate in
    card.style.opacity = '0';
    card.style.transform = 'translateY(-6px)';
    c.appendChild(card);
    requestAnimationFrame(()=>{ card.style.transition = 'opacity .18s, transform .18s'; card.style.opacity = '1'; card.style.transform = 'translateY(0)'; });

    setTimeout(()=>{
        card.style.opacity = '0'; card.style.transform = 'translateY(-6px)';
        setTimeout(()=> card.remove(), 250);
    }, duration);
}

export default notify;

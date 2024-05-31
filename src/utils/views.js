import view from "../components/map/View";
import * as promiseUtils from "@arcgis/core/core/promiseUtils.js";

export const viewClosePopup = () => {

    view.closePopup();

    return;
}

export const viewEventPointerMove = (event) => {

    view.on("pointer-move", event);

    return;
}

export const viewWhenLayerView = (layer, callback) => {

    view.whenLayerView(layer).then(callback);

    return;
}

export const viewGoToExtent = (extent) => {

    view.goTo(extent, { duration: 3000 })
        .catch(function (error) {
            if (error.name != "AbortError") {
                console.error(error);
            }
        });
}

export const viewHitTestLayer = promiseUtils.debounce(async (layer, event) => {

    const hit = await view.hitTest(event);
    const results = hit.results.filter((result) => {
        return result.graphic.layer === layer;
    });

    if (!results.length) {
        return null;
    }
    return {
        graphic: results[0].graphic,
        screenPoint: hit.screenPoint
    };

});

export const viewCreateTooltip = () => {

    const tooltip = document.createElement("div");
    const style = tooltip.style;

    tooltip.setAttribute("role", "tooltip");
    tooltip.classList.add("tooltip-map");

    const textElement = document.createElement("div");
    textElement.classList.add("esri-widget");
    textElement.classList.add("invisible");
    tooltip.appendChild(textElement);

    view.container.appendChild(tooltip);

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let visible = false;

    // move the tooltip progressively
    function move() {
        x += (targetX - x) * 0.1;
        y += (targetY - y) * 0.1;

        if (Math.abs(targetX - x) < 1 && Math.abs(targetY - y) < 1) {
            x = targetX;
            y = targetY;
        } else {
            requestAnimationFrame(move);
        }

        style.transform = "translate3d(" + Math.round(x) + "px," + Math.round(y) + "px, 0)";
    }

    return {
        show: (point, text) => {
            if (!visible) {
                x = point.x;
                y = point.y;
            }

            targetX = point.x;
            targetY = point.y;
            style.opacity = 1;
            visible = true;
            textElement.innerHTML = text;
            textElement.classList.remove("invisible");

            move();
        },

        hide: () => {
            style.opacity = 0;
            visible = false;
        }
    };

}

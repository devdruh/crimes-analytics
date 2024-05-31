import map from "../components/map/Map"

export const mapAddLayer = (layer) => {
    map.layers.add(layer);
}

export const mapRemoveLayer = (layer) => {
    map.layers.remove(layer);
}

export const mapRemoveAllLayers = () => {
    map.layers.removeAll();
}

export const mapOrderLayer = (layer, index) => {
    map.reorder(layer, index);
}
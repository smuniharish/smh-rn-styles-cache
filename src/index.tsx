import { StyleSheet,Platform } from "react-native";
import type {ImageStyle, TextStyle, ViewStyle} from "react-native"
import {MMKV} from 'react-native-mmkv';
import crypto from 'crypto'
import {LRUCache} from 'lru-cache'

const mmkv = new MMKV({id:'style-cache'})

const lru = new LRUCache<string,any>({max:500})

type SupportedStyle = ViewStyle | TextStyle | ImageStyle | object;

const flattenStyle = (style:any):object=>{
  if(Array.isArray(style)){
    return style.reduce((acc,item)=>{
      if(Array.isArray(item)) return {...acc,...flattenStyle(item)};
      if(item && typeof item === "object") return {...acc,...item};
      return acc;
    },{})
  }
  return style || {}
}

const applyPlatformSelect=(style:any):any=>{
  const result:any = {}
  for (const key in style){
    if(key === '...Platform'){
      Object.assign(result,Platform.select(style[key]));
    }else{
      result[key] = style[key]
    }
  }
  return result
}
const hashStyle=(style:object,theme:string):string=>{
  const raw = JSON.stringify({style,theme});
  return crypto.createHash('sha256').update(raw).digest('hex')
}

const getCachedStyle=(inputStyle:SupportedStyle,theme:string='default'):any=>{
  if(typeof inputStyle === 'number'){
    return inputStyle
  }
  if(inputStyle && typeof inputStyle === "object" && '__registeredStyleBrand' in inputStyle){
    console.warn('[StyleCache] Received a pre-cached style ID. cannot persist it.');
    return inputStyle
  }

  const flattened = flattenStyle(inputStyle);
  const finalStyle = applyPlatformSelect(flattened)

  const key = hashStyle(finalStyle,theme);

  if(lru.has(key)){
    return lru.get(key)
  }

  if(mmkv.contains(key)){
    const decoded = JSON.parse(mmkv.getString(key)!);
    const created = StyleSheet.create({style:decoded})
    const result = created.style;
    lru.set(key,result);
    return result;
  }

  const created = StyleSheet.create({style:finalStyle});
  const result = created.style;

  lru.set(key,result);
  mmkv.set(key,JSON.stringify(finalStyle));

  return result;
}
const getCachedStyles = (styleMap:Record<string,SupportedStyle>,theme:string='default') =>{
  const result:Record<string,any> = {};
  for(const key in styleMap){
    const style = styleMap[key]
    if(style != undefined){
        result[key] = getCachedStyle(style,theme)
    }
  }
  return result
}

const clearStyleCache = () => {
  lru.clear();
  mmkv.clearAll();
}

const prewarmStyles = (styles:SupportedStyle[],theme='default') => {
  styles.forEach(style=>getCachedStyle(style,theme))
}

export {getCachedStyle,getCachedStyles,prewarmStyles,clearStyleCache}
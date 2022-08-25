import { createPreviewSubscriptionHook } from "next-sanity";

const config={
    projectId: "5kchib5q",
    dataset:"production",
    apiVersion:"2021-10-21",
    useCdn:true
}

export const sanityClient=createClient(config);

export const usePreviewSubscription=createPreviewSubscriptionHook(config)

export const urlFor=(source)=>createImageUrlBuilder(config).image(source)

export const PortableText=createPortableTextComponent({
   ...config,
   serializers:{}
})
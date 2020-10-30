import sanityClient from "@sanity/client"

const options = {
  dataset: process.env.SANITY_DATASET_NAME,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  // useCdn === true, fast response, it will get you cached data
  // useCdn == false, slower respnse but latest data
}

export default sanityClient(options)

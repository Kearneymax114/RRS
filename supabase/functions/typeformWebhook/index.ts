// deno-lint-ignore-file no-explicit-any
// supabase/functions/typeformWebhook/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

serve(async (req) => {
  try {
    const body = await req.json();

    const answers = body.form_response?.answers ?? [];

    // Extract fields by field.id
    const firstName = answers.find((a: any) => a.field?.id === "wlPNdiihstjc")?.text ?? null;
    const lastName = answers.find((a: any) => a.field?.id === "KHh582o0eTlZ")?.text ?? null;
    const email = answers.find((a: any) => a.field?.id === "qVlk2KCcX4bQ")?.email ?? null;
    const phone = answers.find((a: any) => a.field?.id === "iQlS6itBJHQ7")?.phone_number ?? null;
    const english = answers.find((a: any) => a.field?.id === "PneYCbU8EsmD")?.boolean ?? null;
    const us_uath = answers.find((a: any) => a.field?.id === "hRdN8pL63w1Z")?.boolean ?? null;
    const li_3_yr = answers.find((a: any) => a.field?.id === "pGZrgWT61Ko1")?.boolean ?? null;
    const clean_crim = answers.find((a: any) => a.field?.id === "A62orvZ0df4Z")?.boolean ?? null;
    const weight = answers.find((a: any) => a.field?.id === "YZukiRVs8gLb")?.boolean ?? null;
    const truck_xp = answers.find((a: any) => a.field?.id === "j16FfuDQVxDI")?.boolean ?? null;
    const truck_xp_desc = answers.find((a: any) => a.field?.id === "YDGpAocqFiN4")?.text ?? null;
    const pkg_delv_xp = answers.find((a: any) => a.field?.id === "KUvp8BqGpSzP")?.boolean ?? null;
    const pkg_delv_desc = answers.find((a: any) => a.field?.id === "iFYyabzH1MOM")?.text ?? null;
    const weed = answers.find((a: any) => a.field?.id === "7F4nvDhe5eFy")?.choice?.label ?? null;
    const start_time = answers.find((a: any) => a.field?.id === "9NtvLjEYPT2P")?.choice.label ?? null;
    const weekly_aval = answers.find((a: any) => a.field?.id === "Kx50rrMNEAaf")?.choices.labels ?? null;
    const clean_driving = answers.find((a: any) => a.field?.id === "XQk97IOzh5Ig")?.boolean ?? null;
    const dot_cert = answers.find((a: any) => a.field?.id === "uIGwa6ovwlCg")?.boolean ?? null;
    // const resume = answers.find((a: any) => a.field?.id === "")?.IDK ?? null;
    // const dob = answers.find((a: any) => a.field?.id === "")?.IDK ?? null;
    // const candidate_addy_street = answers.find((a: any) => a.field?.id === "")?.IDK ?? null;
    // const candidate_addy_city = answers.find((a: any) => a.field?.id === "")?.IDK ?? null;
    // const candidate_addy_state = answers.find((a: any) => a.field?.id === "")?.IDK ?? null;
    // const candidate_addy_zip = answers.find((a: any) => a.field?.id === "")?.IDK ?? null;



    // Create Supabase client
    const supabase = createClient(
      Deno.env.get("PROJECT_URL") ?? "",
      Deno.env.get("SERVICE_ROLE_KEY") ?? ""
    );

    // Upsert candidate
    const { data: candidateData, error: candidateError } = await supabase
      .from("candidate")
      .upsert(
        [{ f_name: firstName, l_name: lastName, email, phone }],
        { onConflict: 'email,phone' }
      )
      .select(); // <-- This returns the upserted/updated row(s)

    if (candidateError) {
      console.error("❌ Candidate insert failed:", candidateError);
      return new Response("Insert failed: " + JSON.stringify(candidateError), { status: 500 });
    }

    // Get candidate id (should be only one row)
    const candidate_id = candidateData && candidateData.length > 0 ? candidateData[0].id : null;
    if (!candidate_id) {
      console.error("❌ Could not find candidate id after upsert");
      return new Response("No candidate id found", { status: 500 });
    }

    // Insert application, linking to candidate
    const { error: applicationError } = await supabase
      .from("application")
      .insert([{
        candidate_id, // <-- foreign key
        english,
        us_auth: us_uath,
        license_three_years: li_3_yr,
        dot_cert,
        clean_criminal_record: clean_crim,
        weight_acceptance: weight,
        truck_xp,
        pkg_delv_xp,
        marijuana: weed,
        start_timeframe: start_time,
        weekly_avalibility: weekly_aval,
        truck_xp_desc,
        previous_xp_description: pkg_delv_desc,
        clean_driving_record: clean_driving
      }]);

    if (applicationError) {
      console.error("❌ Application insert failed:", applicationError);
      return new Response("Insert failed: " + JSON.stringify(applicationError), { status: 500 });
    }

    console.log("✅ Inserted or updated:", { firstName, lastName, email, phone });
    return new Response("Success", { status: 200 });

  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return new Response("Unexpected error: " + JSON.stringify(err), {
      status: 500
    });
  }
});
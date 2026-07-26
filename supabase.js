


import { createClient }

from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL =

"https://xwhbgvzklskdsyliwqft.supabase.co";


const SUPABASE_KEY =

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3aGJndnprbHNrZHN5bGl3cWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4ODAwNzQsImV4cCI6MjEwMDQ1NjA3NH0.zXVM6-iINmIjvp_v8fLsDd7fqb1bSCWDDVMZvVSLeN4";



export const supabase = createClient(


    SUPABASE_URL,


    SUPABASE_KEY,


    {


        auth:{


            persistSession:true,


            autoRefreshToken:true,


            detectSessionInUrl:true


        }


    }


);

export const SupabaseEngine={


    initialized:false,


    currentUser:null,


    profile:null,


    session:null


};


export async function initializeSupabase(){


    const {


        data:{session}


    }=


    await supabase.auth.getSession();




    SupabaseEngine.session=session;


    SupabaseEngine.currentUser=


        session?.user ||


        null;




    SupabaseEngine.initialized=true;




    console.log(


        "☁️ Supabase Ready"


    );


}


supabase.auth.onAuthStateChange(


    async(


        event,


        session


    )=>{


        SupabaseEngine.session=session;


        SupabaseEngine.currentUser=


            session?.user ||


            null;




        console.log(


            "Auth:",


            event


        );


    }


);


export function getCurrentUser(){


    return SupabaseEngine.currentUser;


}




export function isLoggedIn(){


    return !!SupabaseEngine.currentUser;


}
export async function signOut(){


    await supabase.auth.signOut();


}
export const BackendVersion={


    name:"PenVerse Backend Engine",


    version:"1.0.0"


};


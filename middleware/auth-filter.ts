import { Context } from '@nuxt/types'

export default ({ redirect, app: { $accessor } }: Context) => {
    const EXIPRE_MINUTE = 60;

    const loginTime = new Date().getTime() - $accessor.user.timestamp
    console.log(`check token={'loginTime':'${loginTime}'}`);
    if (!$accessor.user.token || loginTime > EXIPRE_MINUTE * 60 * 1000) {
        $accessor.user.drop
        console.log("redirect to login");
        return redirect('/login');
    }
}
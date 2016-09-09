<?php
/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе
 * установки. Необязательно использовать веб-интерфейс, можно
 * скопировать файл в "wp-config.php" и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки MySQL
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'ostrova_db_wp');

/** Имя пользователя MySQL */
define('DB_USER', 'root');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', 'root');

/** Имя сервера MySQL */
define('DB_HOST', '127.0.0.1:8889');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8mb4');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '.d;lnT%w|gL@$LfF5(1vf*JV6zmDk_<=%PumB98[73O(<Pv`[T>qKeR{gt3*m/p*');
define('SECURE_AUTH_KEY',  'w;$$OaWMP2yB#K-A*T@(L27y<&^+]Rz7e(:Ux0>foxmg>9P>A@jzDT/)|+)w>6$8');
define('LOGGED_IN_KEY',    'yrDAQoMz_:hZfR#xno{m,6!Z#tHJM71:$06$V.zfG)_a-g?sx))?jscT8n64>#U(');
define('NONCE_KEY',        '&k<<]!8G~tt|)0{c-)?Nyq,z&n{?8/9g=`t-f_8u!9ipyCPe5j05mZcz]YhdBW9Y');
define('AUTH_SALT',        'xFp[{IJ,)E{N8ldv,S0_V_Ify{9+^H&@uPx_rD3:k~dJQaCoP}.U+,EeZM>|r!K=');
define('SECURE_AUTH_SALT', 'j<n`_iWvngx0S2[wP6mjN@c-i{u-{d|Y4]6sEUMo9,$!84-SBkzU-#aAug!Zqws;');
define('LOGGED_IN_SALT',   '/hc7w`pf_G8nhbP.jW:|r+:V1CNOc3*2wwKLE#Y}j^7LLCyW[:4ik:NJEuZ|_~~W');
define('NONCE_SALT',       'HVX1%a_ e.& ,mb66xK3cS!+ S:L,nG.>6W5_C-^#RB.@&yY-{-Bk)t&Bs5M(i27');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'wp_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 * 
 * Информацию о других отладочных константах можно найти в Кодексе.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');

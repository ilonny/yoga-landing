<?php

/**
 * Класс для отправки письма клиенту и в CRM GoldCarrot
 *
 * Class MailSender
 */
class MailSender
{

    /**
     * Почты на которые будет отправляться письма
     * @var array
     */
    private $emails = array(
        'mail@extremebody.ru',
        'lonnyfox@bk.ru'
    );

    /**
     * Название параметров пришедших из формы
     * @var array
     */
    private $data_keys = array(
        self::NAME_PARAM => 'name',
        self::PHONE_PARAM => 'phone',
        self::EMAIL_PARAM => 'email',
        self::TEXT_PARAM => 'text',
    );

    /**
     * Получение верстки сообщения письма
     * @return string
     */
    private function getMessage()
    {
        $message = '';
        $message .= '<div>-------------------------------------------------------------</div> </br></br> ';
        $message .= isset($this->data[self::NAME_PARAM]) ? '<div>Имя: ' . $this->data[self::NAME_PARAM] . '</div>' : '';
        $message .= isset($this->data[self::PHONE_PARAM]) ? '<div>Телефон: ' . $this->data[self::PHONE_PARAM] . '</div>' : '';
        $message .= isset($this->data[self::EMAIL_PARAM]) ? '<div>Email: ' . $this->data[self::EMAIL_PARAM] . '</div>' : '';
        $message .= isset($this->data[self::TEXT_PARAM]) ? '<div>Сообщение: ' . $this->data[self::TEXT_PARAM] . '</div>' : '';
        $message .= '<div>-------------------------------------------------------------</div> </br></br> ';
        return $message;
    }


    /**
     * Тема письма
     * @return string
     */
    private function getSubject()
    {
        return 'запрос на консультацию (extremebody.ru)';
    }

    /**
     * Отправитель письма
     * @return array
     */
    public function getSender()
    {
        return array(
            'name' => 'admin',
            'email' => 'admin@extremebody.ru',

        );
    }

    const NAME_PARAM = 'name';
    /**
     * Служебное название параметра. НЕ ТРОГАТЬ!!!
     */
    const PHONE_PARAM = 'phone';
    /**
     * Служебное название параметра. НЕ ТРОГАТЬ!!!
     */
    const EMAIL_PARAM = 'email';
    /**
     * Служебное название параметра. НЕ ТРОГАТЬ!!!
     */
    const TEXT_PARAM = 'text';

    /**
     * Хранилище параметров
     * @var array
     */
    private $data;

    /**
     * MailSender constructor.
     */
    public function __construct()
    {
        $result = array(
            self::NAME_PARAM => $this->getParam($this->data_keys[self::NAME_PARAM]),
            self::PHONE_PARAM => $this->getParam($this->data_keys[self::PHONE_PARAM]),
            self::EMAIL_PARAM => $this->getParam($this->data_keys[self::EMAIL_PARAM]),
            self::TEXT_PARAM => $this->getParam($this->data_keys[self::TEXT_PARAM]),
        );
        $this->data = array_filter(array_merge($result, array_diff_key($_POST, array_flip($this->data_keys))));
    }

    /**
     * Получение параметра из массива $_POST
     * @param $name
     * @return string
     */
    private function getParam($name)
    {
        return isset($_POST[$name]) ? $_POST[$name] : '';
    }


    /**
     * Получение отправителя
     * @return string
     */
    private function getSenderProcessed()
    {
        $sender = $this->getSender();
        $sender = (isset($sender['name']) && isset($sender['email'])) ? $sender : self::DEFAULT_SENDER;
        return $sender['name'] . " <" . $sender['email'] . ">";
    }

    /**
     * Отправка писем на почты
     *
     * @return bool
     */
    public function send()
    {
        $sent = true;
        foreach ($this->emails as $email) {
            if (!mail($email, $this->getSubject(), $this->getMessage(), implode("\r\n", $this->getHeaders()))) {
                $sent = false;
            }
        }
        return $sent;
    }

    /**
     * Получение заголовков письма
     * @return array
     */
    private function getHeaders()
    {
        $headers = array();
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-type: text/html; charset=utf-8";
        $headers[] = "From: " . $this->getSenderProcessed();
        $headers[] = "Subject: " . $this->getSubject();
        $headers[] = 'X-Mailer: PHP/' . phpversion();
        return $headers;
    }
}


$mailSender = new MailSender();


header("Content-type: text/html; charset=utf-8");
//если письмо отправилось то выводим что все ок






echo json_encode(array(
	'status' => 'ok',
));
$name=$_POST["name"];
$email=$_POST["email"];

include("api.php");
	

